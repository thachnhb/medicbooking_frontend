export const adminMenu = [
  {
    //1. Admin Management Tab
    name: "menu.admin.admin-manage",
    menus: [
      { name: "menu.admin.crud", link: "/system/user-manage" },
      { name: "menu.admin.crud-redux", link: "/system/user-redux" },
      { name: "menu.admin.doctor-manage", link: "/system/doctor-manage" },
      //{name: 'menu.admin.admin-manage', link: '/system/admin-manage' },
      { name: "menu.doctor.schedule-manage", link: "/doctor/schedule-manage" },
    ],
  },
  {
    //2. Medical Centre Management Tab
    name: "menu.admin.centre",
    menus: [
      {
        name: "menu.admin.centre-manage",
        link: "/system/medical-centre-manage",
      },
      {
        name: "menu.admin.create-centre",
        link: "/system/create-medical-centre",
      },
    ],
  },
  {
    //2. Speciality Management Tab
    name: "menu.admin.speciality",
    menus: [
      {
        name: "menu.admin.speciality-manage",
        link: "/system/speciality-manage",
      },
    ],
  },
  {
    //2. Handbook Management Tab
    name: "menu.admin.handbook",
    menus: [
      { name: "menu.admin.handbook-manage", link: "/system/handbook-manage" },
    ],
  },
];

export const doctorMenu = [
  {
    // Doctor ManagementTab (Schedule)
    name: "menu.doctor.doctor-manage",
    menus: [
      { name: "menu.doctor.schedule-manage", link: "/doctor/schedule-manage" },
      { name: "menu.doctor.patient-manage", link: "/doctor/patient-manage" },
    ],
  },
];
