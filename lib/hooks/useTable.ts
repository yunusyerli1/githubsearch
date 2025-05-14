
import { decreasePoints, deleteCampaign, editCampaign, increasePoints } from '../actions/campaign.actions';
import { ICampaign } from '../models/ICampaign';


export interface ITableConfig {
  showHeader: boolean;
  showFooter: boolean;
  titles: Array<string>;
  records: any[];
  actions?: IAction[];
}

export interface IAction {
  iconName: string;
  actionName: string;
  function: Function;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString();
}

function getTableRowActions(): IAction[] {
  return [
    {
      actionName: 'edit',
      iconName: 'edit-line',
      function: editCampaign
    },
    {
      actionName: 'delete',
      iconName: 'delete-bin-line',
      function: deleteCampaign
    }
  ];
}

function getTableCellActions(): IAction[] {
  return [
    {
      actionName: 'increase',
      iconName: 'add-line',
      function: increasePoints
    },
    {
      actionName: 'decrease',
      iconName: 'subtract-line',
      function: decreasePoints
    },
  ]
}

export function useTable(campaigns: ICampaign[]): ITableConfig {

  const tableTitles: string[] = [
    "Title",
    "Description",
    "Points",
    "Date"
  ];

  return {
    showHeader: false,
    showFooter: false,
    titles: tableTitles,
    records: campaigns.map(campaign => ({
      ...campaign,
      date: formatDate(campaign.createdAt),
      points: {
        value: campaign.points,
        actions: getTableCellActions()
      }
    })),
    actions: getTableRowActions()
  };
} 