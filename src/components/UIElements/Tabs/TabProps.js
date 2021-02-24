const TabProps = (index) => {
  return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default TabProps;