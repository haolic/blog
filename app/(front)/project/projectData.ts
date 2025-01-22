export interface IProjectItem {
  title: string;
  url: string;
  subTitle: string;
  description: string;
  technologStack: string[];
  achievement: string;
}

const projectData: IProjectItem[] = [
  {
    title: "Diting区块链",
    url: "https://pc.diting.ai/market",
    subTitle: "跟踪钱包、合约检测、风险检查、费率检查",
    description: "Diting是一个区块链监测平台，主要功能：1.跟踪大佬钱包地址，通知钱包地址异动，好项目快速跟入。2.通知合约大户增减持，发现大户在不断减持，就要注意风险了。3.预警跑路，在项目方跑路前一般会先大量转移代币，再卖出套现，提早发现异动，及时撤退。4.合约检测，发现貔貅，合约风险，费率过高，疑似诈骗项目，统统规避。",
    technologStack: ["React", "Lodash", "JavaScript", "CSS"],
    achievement: "日活用户2000+，牛市峰值日活上万。",
  },
  {
    title: "酒工哥官网",
    url: "https://www.jiuworker.com",
    subTitle: "NextJS、Tailwindcss、SEO优化、SSR",
    description: "酒工哥科技有限公司官网，使用服务端渲染框架nextjs搭建项目，更好的搜索引擎优化，Tailwindcss构建页面样式。项目包含前端静态页面和后端发送邮件服务，均为nextjs实现。",
    technologStack: ["Nextjs", "TypeScript", "CSS", "React", "Tailwindcss"],
    achievement: "开拓与推动公司NextJS与Tailwindcss在公司项目中的实践",
  },
  {
    title: "指南针",
    url: "",
    subTitle: "一站式数据协同平台",
    description: "指南针是预算预测流程的主要产品，核心功能流程为在线勾选维度维值，生成报表，下发给业务方填报，提交报表，进行预测与生成预算。用户包含该流程中BU财务/BU FPA/集团FPA等，使用人数多，频次高，数据严肃性高。",
    technologStack: ["Lodash", "React", "TypeScript", "JavaScript", "React-DnD"],
    achievement: "实现通过托拉拽的可视化方式构建报表所需数据。业务方数据填报速度提升80%以上。",
  },
  {
    title: "酒工哥劳务",
    url: "https://labor.jiuworker.com",
    subTitle: "灵活用工、劳务派遣、劳务外包、人力资源服务",
    description: "酒工哥劳务派遣平台，为企业提供专业的劳务派遣、劳务外包、人力资源服务等一站式人力资源解决方案。平台采用现代化的管理理念和先进的信息技术，实现了劳务派遣全流程的数字化管理，包括人员招聘、入职管理、考勤管理、薪资结算等功能。",
    technologStack: ["Nextjs", "TypeScript", "React", "Tailwindcss"],
    achievement: "服务企业客户100+，管理派遣人员1000+"
  },
  {
    title: "G6交互式文档",
    url: "https://render.mybank.cn/p/c/17sfi50vhu80#/home",
    subTitle: "GraphMaker可视化配置工具",
    description: "GraphMaker是协助用户进行可视化产出G6配置的工具性文档平台，通过可视化的形式，对画布、节点、边、布局的各种参数进行调节，最后可以选择产生具体js代码，用户只需要复制粘贴到业务代码里即可快速生成想要的关系图效果。",
    technologStack: ["JavaScript", "TypeScript", "React", "Lodash", "antd", "g6"],
    achievement: "产出可视化配置文档，方便用户快速生成需要的配置代码，相比文字式文档效率大大提高。",
  },
  {
    title: "网商智能决策平台",
    url: "",
    subTitle: "蚂蚁金服数据分析平台",
    description: "网商智能决策平台是一个供网商数据分析师BI同学进行高效分析指标的平台，解决了BI同学从原始excel手动计算指标、绘制趋势图、对比趋势图的费时费力问题，大大提高BI同学数据分析的思路连贯性。平台也提供了三种权限角色，来控制对页面查看指标、编辑备注的权限。",
    technologStack: ["JavaScript", "CSS", "React", "Lodash", "antd", "g2"],
    achievement: "针对平台抽象出全套实例包括前端组件和后端逻辑，实现搭建交叉表速度缩短90%以上。",
  }
];

export default projectData;
