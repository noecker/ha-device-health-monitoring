# Feeding Majordomo

[Majordomo](https://github.com/noecker/majordomo) is a self-hosted operations queue. This
repository can feed it the *counts* of problem devices, so the queue shows "3 devices with
low battery" as one row that links back to the Device Health panel. The device list itself
never leaves Home Assistant: exclusions, the battery threshold and the per-device view stay
here, and Majordomo stores only the conclusion.

## What ends up on the queue

Up to three `condition` items under one source (default `home-assistant`), one per problem
class. Each carries the count in its title and in `meta.count`:

- `device-health:low-battery` — "3 devices with low battery (below 20%)", severity `low`
  by default (digest only)
- `device-health:unavailable` — "2 devices unavailable", severity `high` by default
  (pushed once when the count leaves zero)
- `device-health:unknown` — "1 device with unknown state", severity `info` by default
  (digest only)

The items are posted with `/api/v1/sync`, so a class whose count drops to zero is simply
omitted and Majordomo closes it with `closed_by = sync`. A re-post updates the title in
place; it does not push again. Pushes happen only when an item is created or reopened.

On the queue, **snooze** and **mute** are the natural verbs. **Done** closes the row until
the next post reopens it with its history, which is harmless but noisy.

## Setup

### 1. The sensor

The integration creates a **Problem Count** sensor next to the existing exclusions
sensor. Its state is the total number of problem entities after entity *and*
device exclusions; its attributes are `low_battery`, `unavailable`, `unknown` and
`battery_threshold`. It recomputes every five minutes and immediately whenever the
exclusions change. Nothing to configure.

### 2. A Majordomo token

In Majordomo's `INTAKE_TOKENS_PATH` file, add a producer token for Home Assistant. It must
be allowed to write (not `read_only`):

```yaml
tokens:
  - name: home-assistant
    token: <at least 16 random characters>
```

### 3. The `rest_command`

Majordomo's URL and token belong in `secrets.yaml`, which a blueprint cannot read, so the
HTTP call lives in `configuration.yaml`:

```yaml
rest_command:
  majordomo_sync:
    url: !secret majordomo_sync_url            # https://majordomo.example.net/api/v1/sync
    method: POST
    headers:
      Authorization: !secret majordomo_authorization   # "Bearer <token>"
    content_type: application/json
    payload: "{{ payload | to_json }}"
```

The blueprint passes the request body as the `payload` variable (a mapping, not a string),
and `to_json` serializes it here. Restart Home Assistant, or reload YAML configuration,
after adding it.

### 4. The blueprint

Import `device_health_majordomo.yaml` the same way as the report blueprint, then create an
automation from it:

- **Problem count sensor:** the integration's Problem Count sensor
- **Sync service:** `rest_command.majordomo_sync` (or whatever you named it)
- **Panel URL:** the absolute URL of the Device Health panel on your instance, so every
  item links back to the list
- **Severities:** the defaults are `low` / `high` / `info`; `high` and `urgent` push to
  your phone when the count leaves zero
- **Settle delay:** a change in the count must hold this long before it is posted
  (default 15 minutes), so a node that drops off for a minute never reaches the queue
- **Daily re-assert:** the current counts are posted once a day regardless, keeping the
  items' last-seen time fresh

The automation never posts while the count sensor is unavailable, because an empty item
list would close every device-health item as if all devices were healthy.

## Caveats

- If Home Assistant stops posting, the items keep their last count and still look current
  on the queue. The daily re-assert makes the gap visible on each item's timeline, and
  Majordomo's planned heartbeat items (Q1 in its ideas list) would turn the silence
  itself into a row.
- The email report blueprint is unchanged and can run alongside; Majordomo deliberately
  sends no email.
- `source` must be a slug of lowercase letters, digits, `_`, `.` and `-`, and the panel URL
  must be absolute (`http://` or `https://`). Majordomo rejects the whole request with a
  400 otherwise; check **Settings → System → Logs** for the `rest_command` error.
