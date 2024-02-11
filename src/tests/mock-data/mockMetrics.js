import mockFullEmployeeList from './mockFullEmployeeList';
import mockGymList from './mockGymList';

const mockMetrics = {
  gymName: mockGymList[0].name,
  metrics: {
    bouldersPerColor: [
      {
        name: "Red",
        count: 14
      },
      {
        name: "Black",
        count: 15
      },
      {
        name: "Tan",
        count: 6
      },
      {
        name: "Blue",
        count: 14
      },
      {
        name: "Yellow",
        count: 13
      },
      {
        name: "Purple",
        count: 11
      },
      {
        name: "White",
        count: 12
      },
      {
        name: "Green",
        count: 13
      },
      {
        name: "Orange",
        count: 11
      }
    ],
    bouldersPerSetter: [
      {
        name: mockFullEmployeeList[0],
        count: 1
      },
      {
        name: mockFullEmployeeList[1],
        count: 6
      },
      {
        name: mockFullEmployeeList[2],
        count: 10
      }
    ],
    routesPerColor: [
      {
        name: "Blue",
        count: 12
      },
      {
        name: "Purple",
        count: 12
      },
      {
        name: "Yellow",
        count: 11
      },
      {
        name: "Orange",
        count: 10
      },
      {
        name: "Black",
        count: 10
      },
      {
        name: "Green",
        count: 11
      },
      {
        name: "White",
        count: 11
      },
      {
        name: "Red",
        count: 9
      },
      {
        name: "Pink",
        count: 25
      }
    ],
    routesPerSetter: [
      {
        name: mockFullEmployeeList[0],
        count: 1
      },
      {
        name: mockFullEmployeeList[1],
        count: 6
      },
      {
        name: mockFullEmployeeList[2],
        count: 10
      }
    ],
    currentRoutesPerGrade: [
      {
        label: "5.6",
        value: 5
    },      {
        label: "5.12-",
        value: 4
    },      {
        label: "5.7",
        value: 9
    },      {
        label: "5.10-",
        value: 7
    },      {
        label: "5.8",
        value: 10
    },      {
        label: "5.11-",
        value: 8
    },      {
        label: "5.9",
        value: 9
    },      {
        label: "5.10+",
        value: 7
    },      {
        label: "Ungraded",
        value: 26
    },      {
        label: "5.5",
        value: 2
    },      {
        label: "5.10",
        value: 8
    },      {
        label: "5.11+",
        value: 6
    },      {
        label: "5.12",
        value: 2
    },      {
        label: "5.11",
        value: 5
    },      {
        label: "5.13-",
        value: 1
    },      {
        label: "5.13",
        value: 1
    },      {
        label: "5.12+",
        value: 1
    } 
    ],
    currentVsIdealRouteGrades: [
      {
        label: "5.3",
        value: 2,
        type: "Ideal"
      },
      {
        label: "5.3",
        value: 0,
        type: "Current"
      },
      {
        label: "5.4",
        value: 1,
        type: "Ideal"
      },
      {
        label: "5.4",
        value: 0,
        type: "Current"
      },
      {
        label: "5.5",
        value: 0,
        type: "Ideal"
      },
      {
        label: "5.5",
        value: 2,
        type: "Current"
      },
      {
        label: "5.6",
        value: 4,
        type: "Ideal"
      },
      {
        label: "5.6",
        value: 5,
        type: "Current"
      },
      {
        label: "5.7",
        value: 6,
        type: "Ideal"
      },
      {
        label: "5.7",
        value: 9,
        type: "Current"
      },
      {
        label: "5.8",
        value: 7,
        type: "Ideal"
      },
      {
        label: "5.8",
        value: 10,
        type: "Current"
      },
      {
        label: "5.9",
        value: 8,
        type: "Ideal"
      },
      {
        label: "5.9",
        value: 9,
        type: "Current"
      },
      {
        label: "5.10-",
        value: 9,
        type: "Ideal"
      },
      {
        label: "5.10-",
        value: 7,
        type: "Current"
      },
      {
        label: "5.10",
        value: 8,
        type: "Ideal"
      },
      {
        label: "5.10",
        value: 8,
        type: "Current"
      },
      {
        label: "5.10+",
        value: 6,
        type: "Ideal"
      },
      {
        label: "5.10+",
        value: 7,
        type: "Current"
      },
      {
        label: "5.11-",
        value: 6,
        type: "Ideal"
      },
      {
        label: "5.11-",
        value: 8,
        type: "Current"
      },
      {
        label: "5.11",
        value: 5,
        type: "Ideal"
      },
      {
        label: "5.11",
        value: 5,
        type: "Current"
      },
      {
        label: "5.11+",
        value: 4,
        type: "Ideal"
      },
      {
        label: "5.11+",
        value: 6,
        type: "Current"
      },
      {
        label: "5.12-",
        value: 4,
        type: "Ideal"
      },
      {
        label: "5.12-",
        value: 4,
        type: "Current"
      },
      {
        label: "5.12",
        value: 3,
        type: "Ideal"
      },
      {
        label: "5.12",
        value: 2,
        type: "Current"
      },
      {
        label: "5.12+",
        value: 2,
        type: "Ideal"
      },
      {
        label: "5.12+",
        value: 1,
        type: "Current"
      },
      {
        label: "5.13-",
        value: 1,
        type: "Ideal"
      },
      {
        label: "5.13-",
        value: 1,
        type: "Current"
      },
      {
        label: "5.13",
        value: 1,
        type: "Ideal"
      },
      {
        label: "5.13",
        value: 1,
        type: "Current"
      },
      {
        label: "5.13+",
        value: 0,
        type: "Ideal"
      },
      {
        label: "5.13+",
        value: 0,
        type: "Current"
      },
      {
        label: "5.14-",
        value: 0,
        type: "Ideal"
      },
      {
        label: "5.14-",
        value: 0,
        type: "Current"
      },
      {
        label: "5.14",
        value: 0,
        type: "Ideal"
      },
      {
        label: "5.14",
        value: 0,
        type: "Current"
      },
      {
        label: "5.14+",
        value: 0,
        type: "Ideal"
      },
      {
        label: "5.14+",
        value: 0,
        type: "Current"
      },
      {
        label: "5.15-",
        value: 0,
        type: "Ideal"
      },
      {
        label: "5.15-",
        value: 0,
        type: "Current"
      },
      {
        label: "5.15",
        value: 0,
        type: "Ideal"
      },
      {
        label: "5.15",
        value: 0,
        type: "Current"
      },
      {
        label: "5.15+",
        value: 0,
        type: "Ideal"
      },
      {
        label: "5.15+",
        value: 0,
        type: "Current"
      },
      {
        label: "Ungraded",
        value: 0,
        type: "Ideal"
      },
      {
        label: "Ungraded",
        value: 26,
        type: "Current"
      }
    ],
    currentVsIdealBoulderGrades: [
      {
        label: "VB",
        value: 2,
        type: "Ideal"
      },
      {
        label: "VB",
        value: 6,
        type: "Current"
      },
      {
        label: "V0",
        value: 5,
        type: "Ideal"
      },
      {
        label: "V0",
        value: 8,
        type: "Current"
      },
      {
        label: "V1",
        value: 7,
        type: "Ideal"
      },
      {
        label: "V1",
        value: 11,
        type: "Current"
      },
      {
        label: "V2",
        value: 9,
        type: "Ideal"
      },
      {
        label: "V2",
        value: 11,
        type: "Current"
      },
      {
        label: "V3",
        value: 10,
        type: "Ideal"
      },
      {
        label: "V3",
        value: 11,
        type: "Current"
      },
      {
        label: "V4",
        value: 11,
        type: "Ideal"
      },
      {
        label: "V4",
        value: 12,
        type: "Current"
      },
      {
        label: "V5",
        value: 12,
        type: "Ideal"
      },
      {
        label: "V5",
        value: 12,
        type: "Current"
      },
      {
        label: "V6",
        value: 11,
        type: "Ideal"
      },
      {
        label: "V6",
        value: 14,
        type: "Current"
      },
      {
        label: "V7",
        value: 11,
        type: "Ideal"
      },
      {
        label: "V7",
        value: 10,
        type: "Current"
      },
      {
        label: "V8",
        value: 10,
        type: "Ideal"
      },
      {
        label: "V8",
        value: 8,
        type: "Current"
      },
      {
        label: "V9",
        value: 8,
        type: "Ideal"
      },
      {
        label: "V9",
        value: 5,
        type: "Current"
      },
      {
        label: "V10",
        value: 5,
        type: "Ideal"
      },
      {
        label: "V10",
        value: 1,
        type: "Current"
      },
      {
        label: "V11",
        value: 3,
        type: "Ideal"
      },
      {
        label: "V11",
        value: 0,
        type: "Current"
      },
      {
        label: "V12",
        value: 0,
        type: "Ideal"
      },
      {
        label: "V12",
        value: 0,
        type: "Current"
      },
      {
        label: "V13",
        value: 0,
        type: "Ideal"
      },
      {
        label: "V13",
        value: 0,
        type: "Current"
      },
      {
        label: "V14",
        value: 0,
        type: "Ideal"
      },
      {
        label: "V14",
        value: 0,
        type: "Current"
      },
      {
        label: "V15",
        value: 0,
        type: "Ideal"
      },
      {
        label: "V15",
        value: 0,
        type: "Current"
      },
      {
        label: "V16",
        value: 0,
        type: "Ideal"
      },
      {
        label: "V16",
        value: 0,
        type: "Current"
      },
      {
        label: "Ungraded",
        value: 0,
        type: "Ideal"
      },
      {
        label: "Ungraded",
        value: 0,
        type: "Current"
      }
    ]
  }
};

export default mockMetrics;