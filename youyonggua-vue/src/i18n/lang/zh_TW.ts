/**
 * 繁体中文
 */
export default {
  // 菜单路由
  route: {
    dashboard: {
      _name: 'Dashboard',
      workplace: { _name: '工作臺' },
      analysis: { _name: '分析頁' },
      monitor: { _name: '監控頁' }
    },
    system: {
      _name: '系統管理',
      user: {
        _name: '用戶管理'
      },
      role: { _name: '角色管理' },
      menu: { _name: '選單管理' },
      dictionary: { _name: '字典管理' },
      organization: { _name: '機构管理' },
      loginRecord: { _name: '登入日誌' },
      operationRecord: { _name: '操作日誌' },
      userInfo: { _name: '' }
    },
    form: {
      _name: '表單頁面',
      basic: { _name: '基礎表單' },
      advanced: { _name: '複雜表單' },
      step: { _name: '分步表單' }
    },
    list: {
      _name: '清單頁面',
      basic: { _name: '基礎清單' },
      advanced: { _name: '複雜清單' },
      card: {
        _name: '卡片清單',
        project: { _name: '項目清單' },
        application: { _name: '應用清單' },
        article: { _name: '文章清單' }
      },
      userInfo: { _name: '' }
    },
    result: {
      _name: '結果頁面',
      success: { _name: '成功頁' },
      fail: { _name: '失敗頁' }
    },
    exception: {
      _name: '异常頁面',
      '403': { _name: '403' },
      '404': { _name: '404' },
      '500': { _name: '500' }
    },
    user: {
      _name: '個人中心',
      profile: { _name: '個人資料' },
      message: { _name: '我的消息' }
    },
    extension: {
      _name: '擴展組件',
      tag: { _name: '標籤組件' },
      regions: { _name: '城市選擇' },
      dragsort: { _name: '拖拽排序' },
      dialog: { _name: '拖拽彈窗' },
      file: { _name: '檔案清單' },
      countUp: { _name: '滾動數字' },
      player: { _name: '視頻播放' },
      map: { _name: '地圖組件' },
      editor: { _name: '富文本框' },
      markdown: { _name: 'markdown' },
      colorPicker: { _name: '顏色選擇' },
      printer: { _name: '列印挿件' },
      excel: { _name: 'excel挿件' }
    },
    example: {
      _name: '常用實例',
      table: { _name: '表格實例' },
      menuBadge: { _name: '選單徽章' },
      document: { _name: '案卷調整' },
      choose: { _name: '批量選擇' },
      eleadmin: { _name: '內嵌頁面' }
    },
    'https://eleadminCom/goods/9': { _name: '獲取授權' }
  },
  // 主框架
  layout: {
    home: '主頁',
    header: {
      profile: '個人中心',
      password: '修改密碼',
      logout: '安全登出'
    },
    footer: {
      website: '官網',
      document: '檔案',
      authorization: '授權',
      copyright: 'Copyright © 2021 武漢易雲智科技有限公司'
    },
    logout: {
      title: '詢問',
      message: '確定要登出嗎?'
    },
    setting: {
      title: '整體風格設定',
      sideStyles: {
        dark: '暗色側邊欄',
        light: '亮色側邊欄'
      },
      headStyles: {
        light: '亮色頂欄',
        dark: '暗色頂欄',
        primary: '主色頂欄'
      },
      layoutStyles: {
        side: '左側選單佈局',
        top: '頂部選單佈局',
        mix: '混合選單佈局'
      },
      colors: {
        default: '拂曉藍',
        dust: '薄暮',
        sunset: '日暮',
        volcano: '火山',
        purple: '醬紫',
        cyan: '明青',
        green: '極光綠',
        geekblue: '極客藍'
      },
      darkMode: '開啟暗黑模式',
      layoutStyle: '導航模式',
      sideMenuStyle: '側欄雙排選單',
      bodyFull: '內容區域鋪滿',
      other: '其它配寘',
      fixedHeader: '固定頂欄區域',
      fixedSidebar: '固定側欄區域',
      fixedBody: '固定主體區域',
      logoAutoSize: 'Logo寬度自動',
      colorfulIcon: '側欄彩色圖標',
      sideUniqueOpen: '側欄排他展開',
      weakMode: '開啟色弱模式',
      showFooter: '開啟全域頁腳',
      showTabs: '開啟多頁簽欄',
      tabStyle: '頁簽顯示風格',
      tabStyles: {
        default: '默認',
        dot: '圓點',
        card: '卡片'
      },
      reset: '重置',
      tips: '該功能可實时預覽各種佈局效果，修改後會緩存在本地，下次打開會記憶主題配寘.'
    }
  },
  // 登录界面
  login: {
    title: '用戶登錄',
    username: '請輸入登入帳號',
    password: '請輸入登入密碼',
    code: '請輸入驗證碼',
    remember: '記住密碼',
    forget: '忘記密碼',
    login: '登入',
    loading: '登入中'
  }
};
