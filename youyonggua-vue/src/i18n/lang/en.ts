/**
 * 英语
 */
export default {
  // 菜单路由
  route: {
    dashboard: {
      _name: 'Dashboard',
      workplace: { _name: 'Workplace' },
      analysis: { _name: 'Analysis' },
      monitor: { _name: 'Monitor' }
    },
    system: {
      _name: 'System',
      user: {
        _name: 'User'
      },
      role: { _name: 'Role' },
      menu: { _name: 'Menu' },
      dictionary: { _name: 'Dictionary' },
      organization: { _name: 'Organization' },
      loginRecord: { _name: 'LoginRecord' },
      operationRecord: { _name: 'OperationRecord' },
      userInfo: { _name: '' }
    },
    form: {
      _name: 'Form',
      basic: { _name: 'Basic Form' },
      advanced: { _name: 'Advanced Form' },
      step: { _name: 'Step Form' }
    },
    list: {
      _name: 'List',
      basic: { _name: 'Basic List' },
      advanced: { _name: 'Advanced List' },
      card: {
        _name: 'Card List',
        project: { _name: 'Project' },
        application: { _name: 'Application' },
        article: { _name: 'Article' }
      },
      userInfo: { _name: '' }
    },
    result: {
      _name: 'Result',
      success: { _name: 'Success' },
      fail: { _name: 'Fail' }
    },
    exception: {
      _name: 'Exception',
      '403': { _name: '403' },
      '404': { _name: '404' },
      '500': { _name: '500' }
    },
    user: {
      _name: 'User',
      profile: { _name: 'Profile' },
      message: { _name: 'Message' }
    },
    extension: {
      _name: 'Extension',
      tag: { _name: 'Tags' },
      regions: { _name: 'CitySelect' },
      dragsort: { _name: 'DragSort' },
      dialog: { _name: 'EleDialog' },
      file: { _name: 'FileList' },
      countUp: { _name: 'CountUp' },
      player: { _name: 'Player' },
      map: { _name: 'Map' },
      editor: { _name: 'Editor' },
      markdown: { _name: 'Markdown' },
      colorPicker: { _name: 'ColorPicker' },
      printer: { _name: 'Printer' },
      excel: { _name: 'Excel' }
    },
    example: {
      _name: 'Example',
      table: { _name: 'ProTable' },
      menuBadge: { _name: 'MenuBadge' },
      document: { _name: 'Document' },
      choose: { _name: 'Choose' },
      eleadmin: { _name: 'IFrame' }
    },
    'https://eleadminCom/goods/9': { _name: 'Authorization' }
  },
  // 主框架
  layout: {
    home: 'Home',
    header: {
      profile: 'Profile',
      password: 'Password',
      logout: 'SignOut'
    },
    footer: {
      website: 'Website',
      document: 'Document',
      authorization: 'Authorization',
      copyright: 'Copyright © 2021 Wuhan EClouds Technology Co., Ltd'
    },
    logout: {
      title: 'Confirm',
      message: 'Are you sure you want to log out?'
    },
    setting: {
      title: 'Theme Setting',
      sideStyles: {
        dark: 'Dark Sidebar',
        light: 'Light Sidebar'
      },
      headStyles: {
        light: 'Light Header',
        dark: 'Dark Header',
        primary: 'Primary Header'
      },
      layoutStyles: {
        side: 'Side Menu Layout',
        top: 'Top Menu Layout',
        mix: 'Mix Menu Layout'
      },
      colors: {
        default: 'Daybreak Blue',
        dust: 'Dust Blue',
        sunset: 'Sunset Orange',
        volcano: 'Volcano',
        purple: 'Golden Purple',
        cyan: 'Cyan',
        green: 'Polar Green',
        geekblue: 'Geek Blue'
      },
      darkMode: 'Dark Mode',
      layoutStyle: 'Navigation Mode',
      sideMenuStyle: 'Sidebar Double Menu',
      bodyFull: 'Body Fullscreen',
      other: 'Other Setting',
      fixedHeader: 'Fixed Header',
      fixedSidebar: 'Fixed Sidebar',
      fixedBody: 'Fixed Body',
      logoAutoSize: 'Logo Adaptation',
      colorfulIcon: 'Colorful Icon',
      sideUniqueOpen: 'Menu Unique Open',
      weakMode: 'Weak Mode',
      showFooter: 'Show Footer',
      showTabs: 'Show Tabs',
      tabStyle: 'Tab Style',
      tabStyles: {
        default: 'Default',
        dot: 'Dot',
        card: 'Card'
      },
      reset: 'Reset',
      tips: 'It will remember your configuration the next time you open it.'
    }
  },
  // 登录界面
  login: {
    title: 'User Login',
    username: 'please input username',
    password: 'please input password',
    code: 'please input code',
    remember: 'remember',
    forget: 'forget',
    login: 'login',
    loading: 'loading'
  }
};
