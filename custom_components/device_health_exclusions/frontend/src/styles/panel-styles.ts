import { css } from 'lit';

export const panelStyles = css`
  :host {
    display: block;
    padding: 16px;
    background-color: var(--primary-background-color);
    color: var(--primary-text-color);
    font-family: var(--paper-font-body1_-_font-family);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .header h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 400;
  }

  .toolbar {
    display: flex;
    gap: 16px;
    align-items: center;
    margin-bottom: 16px;
    padding: 12px;
    background: var(--card-background-color);
    border-radius: 8px;
  }

  .filter-buttons {
    display: flex;
    gap: 8px;
  }

  .filter-button {
    padding: 8px 16px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .filter-button:hover {
    background: var(--secondary-background-color);
  }

  .filter-button.active {
    background: var(--primary-color);
    color: var(--text-primary-color);
    border-color: var(--primary-color);
  }

  .search-box {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid var(--divider-color);
    border-radius: 4px;
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font-size: 14px;
  }

  .table-container {
    background: var(--card-background-color);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: var(--ha-card-box-shadow, 0 2px 4px rgba(0,0,0,0.1));
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  thead {
    background: var(--secondary-background-color);
  }

  th {
    padding: 12px 16px;
    text-align: left;
    font-weight: 500;
    font-size: 14px;
    color: var(--secondary-text-color);
    border-bottom: 2px solid var(--divider-color);
  }

  td {
    padding: 12px 16px;
    border-bottom: 1px solid var(--divider-color);
  }

  tbody tr:hover {
    background: var(--secondary-background-color);
  }

  .checkbox-cell {
    width: 40px;
  }

  .entity-name {
    font-weight: 500;
  }

  .entity-id {
    font-size: 12px;
    color: var(--secondary-text-color);
  }

  .status-badge {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
  }

  .status-battery {
    background: var(--warning-color);
    color: white;
  }

  .status-unavailable {
    background: var(--error-color);
    color: white;
  }

  .status-excluded {
    background: var(--success-color);
    color: white;
  }

  .stats {
    display: flex;
    gap: 24px;
    margin-bottom: 16px;
  }

  .stat-card {
    flex: 1;
    padding: 16px;
    background: var(--card-background-color);
    border-radius: 8px;
    box-shadow: var(--ha-card-box-shadow);
  }

  .stat-value {
    font-size: 32px;
    font-weight: 300;
    color: var(--primary-color);
  }

  .stat-label {
    font-size: 14px;
    color: var(--secondary-text-color);
    margin-top: 4px;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 48px;
  }

  .empty-state {
    text-align: center;
    padding: 48px;
    color: var(--secondary-text-color);
  }

  .empty-state-icon {
    font-size: 64px;
    margin-bottom: 16px;
    opacity: 0.3;
  }
`;
