// eslint-disable-next-line default-param-last,import/prefer-default-export
export const monthlyDashboardDataReducer = (monthlyDashboardData = null, action) => {
  if (action.type === 'GET_MONTHLY_DASHBOARD_DATA') {
    return action.payload;
  }

  return monthlyDashboardData;
};
