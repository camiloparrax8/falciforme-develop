import { useState } from 'react';

export const useTabsFlow = (tabs) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const nextTab = () => {
    if (currentTabIndex < tabs.length - 1) {
      setCurrentTabIndex(currentTabIndex + 1);
    }
  };

  const prevTab = () => {
    if (currentTabIndex > 0) {
      setCurrentTabIndex(currentTabIndex - 1);
    }
  };

  const goToTab = (index) => {
    if (index >= 0 && index < tabs.length) {
      setCurrentTabIndex(index);
    }
  };

  return { currentTabIndex, currentTab: tabs[currentTabIndex], nextTab, prevTab, goToTab };
};
