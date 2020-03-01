import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/login'
},
{
  path: '/login',
  name: 'login',
  component: resolve => require(['../views/login.vue'], resolve)
},
{
  path: '/sysModules',
  name: 'sysModules',
  component: resolve => require(['../views/sysModules.vue'], resolve)
},
{
  path: '/basic',
  name: 'basic',
  component: resolve => require(['../views/basic.vue'], resolve),
  children: [{
    path: '/package',
    name: 'package',
    component: resolve => require(['../views/deploy/package.vue'], resolve)
  },
  {
    path: '/vehicleDevice',
    name: 'vehicleDevice',
    component: resolve => require(['../views/./deploy/vehicleDevice.vue'], resolve)
  },
  {
    path: '/stationDevice',
    name: 'stationDevice',
    component: resolve => require(['../views/./deploy/stationDevice.vue'], resolve)
  },
  {
    path: '/office',
    name: 'office',
    component: resolve => require(['../views/deploy/office.vue'], resolve)
  },
  {
    path: '/company',
    name: 'company',
    component: resolve => require(['../views/deploy/company.vue'], resolve)
  },
  {
    path: '/license',
    name: 'license',
    component: resolve => require(['../views/deploy/licence.vue'], resolve)
  },
  {
    path: '/workplace',
    name: 'workplace',
    component: resolve => require(['../views/workplace/workplace.vue'], resolve)
  },
  {
    path: '/department',
    name: 'department',
    component: resolve => require(['../views/base/department.vue'], resolve)
  },
  {
    path: '/position',
    name: 'position',
    component: resolve => require(['../views/base/position.vue'], resolve)
  },
  {
    path: '/employee',
    name: 'employee',
    component: resolve => require(['../views/base/employee.vue'], resolve)
  },
  // {
  //   path: '/station',
  //   name: 'station',
  //   component: resolve => require(['../views/base/station.vue'], resolve)
  // },
  {
    path: '/garbageRoom',
    name: 'garbageRoom',
    component: resolve => require(['../views/base/garbageRoom.vue'], resolve)
  },
  {
    path: '/public',
    name: 'public',
    component: resolve => require(['../views/base/public.vue'], resolve)
  },
  {
    path: '/driver',
    name: 'driver',
    component: resolve => require(['../views/base/driver.vue'], resolve)
  },
  {
    path: '/role',
    name: 'role',
    component: resolve => require(['../views/base/role.vue'], resolve)
  },
  {
    path: '/sample',
    name: 'sample',
    component: resolve => require(['../views/base/sample.vue'], resolve)
  },
  {
    path: '/dataRule',
    name: 'dataRule',
    component: resolve => require(['../views/base/dataRule.vue'], resolve)
  },
  {
    path: '/licenseMessage',
    name: 'licenseMessage',
    component: resolve => require(['../views/base/licenseMessage.vue'], resolve)
  },
  {
    path: '/domesticWaste',
    name: 'domesticWaste',
    component: resolve => require(['../views/base/domesticWaste.vue'], resolve)
  },
  {
    path: '/property',
    name: 'property',
    component: resolve => require(['../views/base/property.vue'], resolve)
  },
  {
    path: '/constructionWaste',
    name: 'constructionWaste',
    component: resolve => require(['../views/base/constructionWaste.vue'], resolve)
  },
  {
    path: '/transferStation',
    name: 'transferStation',
    component: resolve => require(['../views/base/transferStation.vue'], resolve)
  },
  {
    path: '/community',
    name: 'community',
    component: resolve => require(['../views/base/community.vue'], resolve)
  },
  {
    path: '/basicVehicleDevice',
    name: 'basicVehicleDevice',
    component: resolve => require(['../views/base/basicVehicleDevice.vue'], resolve)
  },
  {
    path: '/basicStationDevice',
    name: 'basicStationDevice',
    component: resolve => require(['../views/base/basicStationDevice.vue'], resolve)
  },
  {
    path: '/lounge',
    name: 'lounge',
    component: resolve => require(['../views/base/lounge.vue'], resolve)
  },
  {
    path: '/vehicle',
    name: 'vehicle'
  }, {
    path: '/electricVehicle',
    name: 'electricVehicle',
    component: resolve => require(['../views/base/electricVehicle.vue'], resolve)
  }, {
    path: '/constructionRefuse', // 建筑垃圾
    name: 'constructionRefuse',
    component: resolve => require(['../views/base/constructionRefuse.vue'], resolve)
  },
  {
    path: '/liveRefuse', // 生活垃圾
    name: 'liveRefuse',
    component: resolve => require(['../views/base/liveRefuse.vue'], resolve)
  },
  // 收运
  {
    path: '/lineManagement', // 线路设置
    name: 'lineManagement',
    component: resolve => require(['../views/receipt/lineManagement.vue'], resolve)
  },
  // 巡查模块的巡查模板
  {
    path: '/inspectionTemplate', // 巡查模板
    name: 'inspectionTemplate',
    component: resolve => require(['../views/quality/inspectionTemplate.vue'], resolve)
  },
  // 巡查模块的巡查计划
  {
    path: '/inspectionPlan', // 巡查计划
    name: 'inspectionPlan',
    component: resolve => require(['../views/quality/inspectionPlan.vue'], resolve)
  },
  // 巡查模块的巡查小区
  {
    path: '/inspectionPlot', // 巡查计划
    name: 'inspectionPlot',
    component: resolve => require(['../views/quality/inspectionPlot.vue'], resolve)
  },
  // 巡查模块的巡查单位
  {
    path: '/inspectionUnit', // 巡查计划
    name: 'inspectionUnit',
    component: resolve => require(['../views/quality/inspectionUnit.vue'], resolve)
  },
  {
    path: '/pressureStation',
    name: 'pressureStation',
    component: resolve => require(['../views/base/pressureStation.vue'], resolve)
  },
  {
    path: '/toilet',
    name: 'toilet',
    component: resolve => require(['../views/base/toilet.vue'], resolve)
  }
  ]
}
]

const router = new VueRouter({
  routes
})

export default router
