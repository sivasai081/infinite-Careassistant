export const conditionData = {
    columns: [
      {
        label: 'DATES',
        field: 'dates',
        sort: 'asc', 
        
      },
      {
        label: 'ICD CODE',
        field: 'icdcode',
        sort: 'asc',  
      },
      {
        label: 'CONDITION',
        field: 'condition',
        sort: 'asc',
      }
    ],
    rows: [
      {
        dates: '15 OCT 2015 - N/A',
        icdcode: 'ICD9 250.00',
        condition: 'PREDIABETES',
 
      },
    {
        dates: '05 FEB 2013 - 19 FEB 2013',
        icdcode: 'ICD9 250.00',
        condition: 'BRONCHITIS',
 
      },
    {
        dates: '23 APR 2012 - 28 APR 2012',
        icdcode: 'ICD9 250.00',
        condition: 'VIRAL SINUSITIS',
 
      }
    ]
  };

  export const riskScoreData = {
    columns: [
      {
        label: 'DATE',
        field: 'date',
        sort: 'asc', 
        
      },
      {
        label: 'Type',
        field: 'type',
        sort: 'asc',  
      },
      {
        label: 'Score',
        field: 'score',
        sort: 'asc',  
      },

      {
        label: 'RATING',
        field: 'rating',
        sort: 'asc',
      }
    ],
    rows: [
      {
        date: '22 JAN 2022',
        type: 'CCC',
        score:'3.16%',
        rating: 'Moderate',
 
      },
      {
        date: '22 JAN 2022',
        type: 'CCI',
        score:'2.16%',
        rating: 'High Risk',
 
      },
      {
        date: '22 JAN 2022',
        type: 'CMS HCC',
        score:'1.16%',
        rating: 'Low',
 
      }
    ]
  };
  export const medicationsData = {
    columns: [
      {
        label: 'DATES',
        field: 'dates',
        sort: 'asc', 
        
      },
      {
        label: 'MEDICATION',
        field: 'medication',
        sort: 'asc',  
      },
      {
        label: 'Reason',
        field: 'reason',
        sort: 'asc',  
      },
      {
        label: 'Provider',
        field: 'provider',
        sort: 'asc',  
      },
      {
        label: 'COST',
        field: 'cost',
        sort: 'asc',
      }
    ],
    rows: [
      {
        dates: '04 FEB 2019 - 12 MAR 2019',
        medication: 'Nitroglycerin 0.4Mg/ ACTUAT Mucosal Spray',
        reason: 'No Reason Listed',
        provider: 'Kaiser Permanente',
        cost: '$126.00',
      },
      {
        dates: '04 FEB 2019 - 04 FEB 2019',
        medication: 'amLODIPine 5MG/ Hydrochlorothiazide 12.5 MG/ Olmesartan Medoxomil 20MG Oral Tablet A',
        reason: 'Hypertension',
        provider: 'Kaiser Permanente',
        cost: '$2371.00',
      },
      
    ]
  };

  export const ObservationsData = {
    columns: [
      {
        label: 'DATES',
        width: "200",
        field: 'dates',
        sort: 'asc', 
        
      },
      {
        label: 'CPT CODE',
        field: 'cptcode',
        width: "200",
        sort: 'asc',  
      },
      {
        label: 'DESCRIPTION',
        width: "200",
        field: 'description',
        sort: 'asc',
      },
      {
        label: 'COST',
        field: 'cost',
        sort: 'asc',
      }
    ],
    rows: [
      {
        dates: '04 FEB 2019',
        cptcode: '',
        description: 'Diastolic Blood Pressure',
        cost:'95mm [Hg]'
      },
      {
        dates: '04 FEB 2019',
        cptcode: '',
        description: 'Systolic Blood Pressure',
        cost:'170mm [Hg]'
      },
      {
        dates: '05 APR 2018',
        cptcode: '',
        description: 'Heart Rate',
        cost:'99/min'
      },
      {
        dates: '04 APR 2018',
        cptcode: '',
        description: 'Repository Rate',
        cost:'14/min'
      },
      {
        dates: '04 APR 2018',
        cptcode: '',
        description: 'Total Cholestrol',
        cost:'223mg/dL'
      },
      {
        dates: '04 FEB 2019',
        cptcode: '',
        description: 'Diastolic Blood Pressure',
        cost:'95mm [Hg]'
      },
      
    ]
  };

  export const procedureData = {
    columns: [
      {
        label: 'DATES',
        field: 'dates',
        width: "200",
        sort: 'asc', 
        
      },
      {
        label: 'CPT CODE',
        field: 'cptcode',
        width: "200",
        sort: 'asc',  
      },
      {
        label: 'DESCRIPTION',
        width: "200",
        field: 'description',
        sort: 'asc',
      },
      {
        label: 'COST',
        width: "200",
        field: 'cost',
        sort: 'asc',
      }
    ],
    rows: [
      {
        dates: '04 FEB 2019 - 24 MAR 2019',
        cptcode: 'Procedure',
        description: 'Spirometry Chronic Obstructive Bronchitis',
        cost:'$1298.16'
      },
      {
        dates: '07 JUN 2019 - 26 JUL 2019',
        cptcode: '',
        description: 'Insertion of Subcutaneous Contaceptive',
        cost:'$1298.16'
      },
      
    ]
  };

  export const encountersData = {
    columns: [
      {
        label: 'TYPE',
        field: 'type',
        sort: 'asc', 
        
      },
      {
        label: 'START DATE',
        field: 'startDate',
        sort: 'asc',  
      },
      {
        label: 'END DATE',
        field: 'endDate',
       sort: 'asc',
      },
      {
        label: 'PROVIDER',
        field: 'provider',
        sort: 'asc',
      },
      {
        label: 'INSURANCE',
        field: 'insurance',
        sort: 'asc',
      },
      {
        label: 'COST',
        field: 'cost',
        sort: 'asc',
      },
      {
        label: 'DESCRIPTION',
        field: 'description',
        sort: 'asc',
      },
      {
        label: 'REASON',
        field: 'reason',
        sort: 'asc',
      }
    ],
    rows: [
      {
        type: 'Inpatient',
        startDate: '08 AUG 2016',
        endDate: '08 AUG 2016',
        provider:'Hoag Hospital',
        insurance:'Kaiser Permanente',
        cost:'$345.83',
        identifier:'Bronchitis',
        description:'Admission to Thoracic Surgery Department',
        reason:'Chornic Obsterctive Broncitis(disorder)'
      },
      {
        type: 'Emergency',
        startDate: '15 FEB 2013',
        endDate: '15 FEB 2013',
        provider:'Hoag Hospital',
        insurance:'Kaiser Permanente',
        cost:'$234.17',
        identifier:'Bronchitis',
        description:'Emergency Encounter',
        reason:'Acute Broncitis(disorder)'
      },
      {
        type: 'Urgent Care',
        startDate: '21 JAN 2011',
        endDate: '21 JAN 2011',
        provider:'Hoag Hospital',
        insurance:'Kaiser Permanente',
        cost:'$129.16',
        identifier:'-',
        description:'Urgent Care Clinic (Procedure)',
        reason:'-'
      },
      {
        type: 'Wellness',
        startDate: '18 JUN 1996',
        endDate: '18 JUN 1996',
        provider:'Hoag Hospital',
        insurance:'Kaiser Permanente',
        cost:'$95.03',
        identifier:'-',
        description:'General Examination of Patient',
        reason:'-'
      },
      {
        type: 'Outpatient',
        startDate: '05 FEB 1999',
        endDate: '05 FEB 1999',
        provider:'Hoag Hospital',
        insurance:'Kaiser Permanente',
        cost:'$129.16',
        identifier:'-',
        description:'Encounter for Checkup (Procedure)',
        reason:'-'
      },
      {
        type: 'Ambulatory',
        startDate: '08 AUG 2016',
        endDate: '08 AUG 2016',
        provider:'Hoag Hospital',
        insurance:'Kaiser Permanente',
        cost:'$345.83',
        identifier:'Anemia',
        description:'Encounter for Problem',
        reason:'Anemia (Disorder)'
      },
    ]
  };

  export const assessmentData = {
    columns: [
      {
        label: 'COMPLETED DATE',
        field: 'completedDate',
        sort: 'asc', 
        
      },
      {
        label: 'TYPE',
        field: 'type',
        sort: 'asc',  
      },
      {
        label: 'STATUS',
        field: 'status',
        sort: 'asc',
      },
      {
        label: 'ASSESSMENT NAME',
        field: 'patient_id',
        sort: 'asc',
      },
      {
        label: 'DUE DATE',
        field: 'dueDate',
        sort: 'asc',
      },
      
    ],
    rows: [
      {
        completedDate:'25 MAY 2020',
        type: 'HRA',
        status: 'Completed',
        startedBy: 'Iva Mendez',
        completedBy:'Iva Mendez',
        dueDate:'26 MAY 2020', 
      },
      {
        completedDate:'25 MAY 2020',
        type: 'HRA',
        status: 'Completed',
        startedBy: 'Iva Mendez',
        completedBy:'Iva Mendez',
        dueDate:'26 MAY 2020', 
      },
      {
        completedDate:'25 MAY 2020',
        type: 'HRA',
        status: 'Completed',
        startedBy: 'Iva Mendez',
        completedBy:'Iva Mendez',
        dueDate:'26 MAY 2020', 
      },
      
    ]
  };

  export const allergiesData = {
    columns: [
      {
        label: 'DATES',
        field: 'startdate',
        width: "200",
        sort: 'asc', 
        
      },
      {
        label: 'ALLERGY',
        field: 'agdescription',
        width: "200",
        sort: 'asc',  
      },
      {
        label: 'STATUS',
        field: 'status',
        width: "200",
        sort: 'asc',
      },
    ],
    rows: [
      {
        "startdate" : "1979-05-03T00:00:00.000Z",
        "enddate" : "",
        "patient_id" : "c73cb036-a36f-4911-93c5-7268c00c2e5f",
        "encounter_id" : "d85db90a-5f1f-45bf-aade-f79c1efb49d2",
        "agcode" : 419474003,
        "agdescription" : "Allergy to mould"
    },
    {
        "startdate" : "1979-05-03T00:00:00.000Z",
        "enddate" : "",
        "patient_id" : "c73cb036-a36f-4911-93c5-7268c00c2e5f",
        "encounter_id" : "d85db90a-5f1f-45bf-aade-f79c1efb49d2",
        "agcode" : 232350006,
        "agdescription" : "House dust mite allergy"
    },
    {
        "startdate" : "1979-05-03T00:00:00.000Z",
        "enddate" : "",
        "patient_id" : "c73cb036-a36f-4911-93c5-7268c00c2e5f",
        "encounter_id" : "d85db90a-5f1f-45bf-aade-f79c1efb49d2",
        "agcode" : 232347008,
        "agdescription" : "Dander (animal) allergy"
    },
    {
        "startdate" : "1979-05-03T00:00:00.000Z",
        "enddate" : "",
        "patient_id" : "c73cb036-a36f-4911-93c5-7268c00c2e5f",
        "encounter_id" : "d85db90a-5f1f-45bf-aade-f79c1efb49d2",
        "agcode" : 418689008,
        "agdescription" : "Allergy to grass pollen"
    },
    {
       "startdate" : "1979-05-03T00:00:00.000Z",
      "enddate" : "",
      "patient_id" : "c73cb036-a36f-4911-93c5-7268c00c2e5f",
      "encounter_id" : "d85db90a-5f1f-45bf-aade-f79c1efb49d2",
      "agcode" : 417532002,
      "agdescription" : "Allergy to fish"
  },
  {
      "startdate" : "1979-05-03T00:00:00.000Z",
      "enddate" : "",
      "patient_id" : "c73cb036-a36f-4911-93c5-7268c00c2e5f",
      "encounter_id" : "d85db90a-5f1f-45bf-aade-f79c1efb49d2",
      "agcode" : 91935009,
      "agdescription" : "Allergy to peanuts"
  },
  {
      "startdate" : "1967-01-18T00:00:00.000Z",
      "enddate" : "",
      "patient_id" : "8e53ee5f-2637-4cb9-84f0-470a0104538a",
      "encounter_id" : "9eb1fe4a-fd16-4457-a411-26290efc56b5",
      "agcode" : 300913006,
      "agdescription" : "Shellfish allergy"
  },
    ]
  };

  export const immunizationData = {
    columns: [
      {
        label: 'DATES',
        field: 'dates',
        width: "200",
        sort: 'asc', 
        
      },
      {
        label: 'IMMUNIZATION',
        field: 'immunization',
        width: "200",
        sort: 'asc',  
      },
      {
        label: 'COST',
        width: "200",
        field: 'cost',
        sort: 'asc',
      },
    ],
    rows: [
      {
        dates:'02 AUG 2019',
        immunization: 'Influenza',
        cost: '$19.99',
      },
      {
        dates:'02 AUG 2019',
        immunization: 'Influenza',
        cost: '$19.99',
      },
      {
        dates:'02 AUG 2019',
        immunization: 'Influenza',
        cost: '$19.99',
      },
    ]
  };

  export const imagingData = {
    columns: [
      {
        label: 'DATES',
        field: 'dates',
        sort: 'asc', 
        
      },
      {
        label: 'DESCRIPTION',
        field: 'description',
        sort: 'asc',  
      }
      // {
      //   label: 'TYPE',
      //   field: 'type',
      //   sort: 'asc',
      // },
    ],
    rows: [
      {
        dates:'02 AUG 2019',
        description: 'CT Scan Chest',
        type: 'Inpatient',
      },
      {
        dates:'02 AUG 2019',
        description: 'CT Scan Chest',
        type: 'Inpatient',
      },
      {
        dates:'02 AUG 2019',
        description: 'CT Scan Chest',
        type: 'Inpatient',
      },
    ]
  };

  export const lungcancerData = {
    columns: [
      {
        label: 'MEASURE',
        field: 'measure',
        sort: 'asc', 
        
      },
      {
        label: 'PERFORMANCE',
        field: 'performance',
        sort: 'asc',  
      },
      {
        label: 'NUM',
        field: 'num',
        sort: 'asc',
      },
      {
        label: 'DEN',
        field: 'den',
        sort: 'asc',
      },
      {
        label: 'To Tgt',
        field: 'tgt',
        sort: 'asc',
      },
      {
        label: 'Prev',
        field: 'prev',
        sort: 'asc',
      },
    ],
    rows: [
      {
        measure:'Diabetes Statin Adherenece',
        performance: 42,
        num: '1,306',
        den:'2,806',
        tgt:'97',
        prev:'+1%'
      },
      {
        measure:'DM Eye Exam',
        performance: 47,
        num: '5,970',
        den:'12,065',
        tgt:'333',
        prev:'-17%'
      },
      {
        measure:'Antidepressant Manage',
        performance: 32,
        num: '1,220',
        den:'4,232',
        tgt:'690',
        prev:'-10%'
      },
      {
        measure:'DM HbA1c Testing',
        performance: 43,
        num: '5,228',
        den:'223',
        tgt:'1,075',
        prev:'-16%'
      },
      {
        measure:'DM BP Control',
        performance: 43,
        num: '9,626',
        den:'2,156',
        tgt:'2,806',
        prev:'-17%'
      },
      {
        measure:'HTN Blood Pressure Control',
        performance: 54,
        num: '7,722',
        den:'1,980',
        tgt:'2,806',
        prev:'-12%'
      },
      
    ]
  };

  export const careManagersData = {
    columns: [
      {
        label: '',
        field: 'pic',
        sort: 'asc', 
        
      },
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',  
      },
      {
        label: 'Caseload',
        field: 'cpatients',
        sort: 'asc',
      },
      {
        label: 'Patients',
        field: 'patients',
        sort: 'asc',
      },
      {
        label: 'High',
        field: 'TIER1',
        sort: 'asc',
      },
      {
        label: 'Medium',
        field: 'TIER2',
        sort: 'asc',
      },
      {
        label: 'Low',
        field: 'TIER3',
        sort: 'asc',
      },
      {
        label: 'Alerts',
        field: 'TIER2',
        sort: 'asc',
      },
      {
        label: 'Tasks',
        field: 'tasks',
        sort: 'asc',
      },
      {
        label: 'Assessments',
        field: 'TIER3',
        sort: 'asc',
      },
      {
        label: 'Careplans',
        field: 'TIER1',
        sort: 'asc',
      }
      
    ],
    rows: [
      {
        pic:'',
        name: 'David James',
        cpatients: 90,
        patients:'70',
        TIER1:'35',
        TIER2:'30',
        TIER3:'5',
        tasks:'140',
        clpatients:'24(Comorbidities/Cancer/Different Diagnosis/High Complexity)'
      },
      {
        pic:'',
        name: 'Tony Stark',
        cpatients: 80,
        patients:'55',
        TIER1:'20',
        TIER2:'15',
        TIER3:'20',
        tasks:'130',
        clpatients:'33(Consider a matchmaker algorithm)'
      },
      {
        pic:'',
        name: 'Andre Glutzgiv',
        cpatients: 70,
        patients:'18',
        TIER1:'9',
        TIER2:'6',
        TIER3:'3',
        tasks:'107',
        clpatients:'24(Comorbidities/Cancer/Different Diagnosis/High Complexity)'
      },
      {
        pic:'',
        name: 'James Gibbons',
        cpatients: 60,
        patients:'17',
        TIER1:'9',
        TIER2:'6',
        TIER3:'4',
        tasks:'98',
        clpatients:'24(Comorbidities/Cancer/Different Diagnosis/High Complexity)'
      },
      {
        pic:'',
        name: 'David James',
        cpatients: 50,
        patients:'70',
        TIER1:'70',
        TIER2:'65',
        TIER3:'55',
        tasks:'78',
        clpatients:'24(Comorbidities/Cancer/Different Diagnosis/High Complexity)'
      },
      {
        pic:'',
        name: 'Tony Stark',
        cpatients: 50,
        patients:'55',
        TIER1:'20',
        TIER2:'15',
        TIER3:'20',
        tasks:'62',
        clpatients:'24(Comorbidities/Cancer/Different Diagnosis/High Complexity)'
      },
      {
        pic:'',
        name: 'Andre Glutzgiv',
        cpatients: 40,
        patients:'18',
        TIER1:'9',
        TIER2:'6',
        TIER3:'3',
        tasks:'43',
        clpatients:'24(Comorbidities/Cancer/Different Diagnosis/High Complexity)'
      },
      {
        pic:'',
        name: 'James Gibbons',
        cpatients: 30,
        patients:'17',
        TIER1:'9',
        TIER2:'6',
        TIER3:'4',
        tasks:'41',
        clpatients:'24(Comorbidities/Cancer/Different Diagnosis/High Complexity)'
      },
      {
        pic:'',
        name: 'David James',
        cpatients: 20,
        patients:'70',
        TIER1:'70',
        TIER2:'65',
        TIER3:'55',
        tasks:'32',
        clpatients:'24(Comorbidities/Cancer/Different Diagnosis/High Complexity)'
      },
      
    ]
  };
  export const caremanagerusers = {
    data: [
      {
        id:'1',
        firstname:'Iva',
        lastname: 'Mendez',
        mobile:'123099202334',
        highusers: 16,
        moderateusers:11,
        lowusers: 5
      },
      {
        id:'2',
        firstname:'James',
        lastname: 'Rodriguez',
        mobile:'123099202334',
        highusers: 10,
        moderateusers:10,
        lowusers: 12
      },
      {
        id:'3',
        firstname:'David',
        lastname: 'Hazard',
        mobile:'123099202334',
        highusers: 6,
        moderateusers:2,
        lowusers: 24
      },
      {
        id:'4',
        firstname:'Johnny',
        lastname: 'Newman',
        mobile:'123099202334',
        highusers: 10,
        moderateusers:10,
        lowusers: 12
      },
      {
        id:'5',
        firstname:'Dora',
        lastname: 'Lin',
        mobile:'123099202334',
        highusers: 2,
        moderateusers:20,
        lowusers: 10
      },
      {
        id:'6',
         firstname:'Joe',
        lastname: 'Chung',
        mobile:'123099202334',
        highusers: 6,
        moderateusers:2,
        lowusers: 24
      },
    ]
  };
  export const searchData = {
    data: [
      {
        id:'1',
        firstname:'Joe',
        lastname: 'Martin',
        mobile:'123099202334',
        highusers: 16,
        moderateusers:11,
        lowusers: 5
      },
      {
        id:'2',
        firstname:'Nick',
        lastname: 'Vas',
        mobile:'123099202334',
        highusers: 10,
        moderateusers:10,
        lowusers: 12
      },
      {
        id:'3',
        firstname:'Neta452',
        lastname: 'Grimes165',
        mobile:'123099202334',
        highusers: 6,
        moderateusers:2,
        lowusers: 24
      },
      {
        id:'4',
        firstname:'Fletcher87',
        lastname: 'Kulas532',
        mobile:'123099202334',
        highusers: 10,
        moderateusers:10,
        lowusers: 12
      },
      {
        id:'5',
        firstname:'Earnest658',
        lastname: 'Mueller846',
        mobile:'123099202334',
        highusers: 2,
        moderateusers:20,
        lowusers: 10
      },
      {
        id:'6',
         firstname:'Titus37',
        lastname: 'Baliestreri607',
        mobile:'123099202334',
        highusers: 6,
        moderateusers:2,
        lowusers: 24
      },
    ]
  };
  export const caremanagerPatients = {
    data: [
      {
        id:'1',
        firstname:'Hassan290',
        lastname: 'Greenfelder',
        mobile:'123099202334',
        highusers: 16,
        moderateusers:11,
        lowusers: 5
      },
      {
        id:'2',
        firstname:'Ollie731',
        lastname: 'Mayerty',
        mobile:'123099202334',
        highusers: 10,
        moderateusers:10,
        lowusers: 12
      },
      {
        id:'3',
        firstname:'Ty725',
        lastname: 'Hammes',
        mobile:'123099202334',
        highusers: 6,
        moderateusers:2,
        lowusers: 24
      },
      {
        id:'4',
        firstname:'Tyler508',
        lastname: 'Bauch723',
        mobile:'123099202334',
        highusers: 10,
        moderateusers:10,
        lowusers: 12
      },
      {
        id:'5',
        firstname:'Cleo7',
        lastname: 'Yundt842',
        mobile:'123099202334',
        highusers: 2,
        moderateusers:20,
        lowusers: 10
      },
      {
        id:'6',
         firstname:'Peg114',
        lastname: 'Gutkowski940',
        mobile:'123099202334',
        highusers: 6,
        moderateusers:2,
        lowusers: 24
      },
    ]
  };
  export const notesData = {
    data: [
      {
        id:'5',
        dates:'7/2/2020 17:59:01',
        noteType:'ICT Note',
        noteTitle:'Meeting for Blood Vessel Surgery',
        description: `Patient Brain McKnight has a scheduled angioplasty on 03/02/2022. ICT meeting to be scheduled by 02/01/2022 with patient, primary care provider, and cardiology. `,
        provider: 'James DeRozen, Specialist',
        tags:['non-compliant','appointments']
      },
      {
        id:'6',
        dates:'7/2/2020 03:43:23',
        noteType:'Barrier Note',
        noteTitle:'The patient has been non-compliant with both medications and keeping appointments to his providers',
        description: `Patient Joan Cookman does not take her medication or keep appointments with her provider. Interventions geared toward medication and appointment compliance are primary.`,
        provider: 'James DeRozen, Specialist',
        tags:['non-compliant','appointments']
      },
      {
        id:'7',
        dates:'7/2/2020 19:32:23',
        noteType:'General Note',
        noteTitle:'Personal Situation of the patient',
        description: `Patient John Smith is the primary caregiver for bedridden spouse. Daughter lives three blocks from their home and works night shift Tuesday through Friday. `,
        provider: 'James DeRozen, Specialist',
        tags:['non-compliant','appointments']
      },
      
      {
        id:'3',
        dates:'7/5/2020 16:21:18',
        noteType:'Care Plan',
        noteTitle:'Hypertension note #1',
        description: 'The patient wishes to work on improving his living situation and getting a permanent home to reside in.',
        provider: 'Iva Mendez, Care Manager',
        tags:['non-compliant','appointments']
      },
      {
        id:'8',
        dates:'2/18/2021 15:11:34',
        noteType:'Attempt to Contact',
        noteTitle:'Member/Beneficiary',
        description: 'Attempt to Contact Member/Beneficiary in-person. Attempt unsuccesful. Will need called twice a day untill contact is made.',
        provider: 'Iva Mendez, Care Manager',
        tags:['non-compliant','appointments']
      },
      {
        id:'4',
        dates:'7/2/2020 22:01:55',
        noteType:'EMR',
        noteTitle:'Emergency EMR Note',
        description: `Patient presented to emergency room with chest pain. Past medical history included CHF and hypertension. BP 160/90, HR 130.
        Patient was placed on telemetry and administered 30mg of IV cardizem. S/P cardizem BP 120/80, HR 85. Patient stated chest pain resolved.`,
        provider: 'Brian Lettner, Doctor',
        tags:['non-compliant','appointments']
      }
      
     
    ]
  };
 
  export const memberMessages = {
    data: [
      {
        id:1,
        name: 'Amilla Luna',
        message: 'You: Thanks Jane, I recieved the..',
        date:'5:48pm',
        isNew: false,
        image:'member1.png'
      },
      {
        id:2,
        name: 'Pavel Benedict',
        message: 'Hi Doc, I surveyed the patient and..',
        date:'2:34pm',
        isNew: true,
        image:'member2.png'
      },
      {
        id:3,
        name: 'Kenneth Roswald',
        message: 'I imported James EMR from Kaise..',
        date:'11:00pm',
        isNew: false,
        image:'member3.png'
      },
      {
        id:4,
        name: 'Elizabeth Johnstone',
        message: 'The care team will be joining in..',
        date:'8/25/20',
        isNew: false,
        image:'member4.png'
      },
      {
        id:5,
        name: 'Ryan Garcia',
        message: '1 Attachment',
        date:'8/24/20',
        isNew: true,
        image:'member5.png'
      },
      {
        id:6,
        name: 'ICT James Jackson - Diab..',
        message: 'I imported James EMR from Kaise..',
        date:'8/3/20',
        isNew: false,
        image:'member1.png'
      },
    ]
  }
  export const memberData = {
    data: [
      {
        id: 1,
        name: 'Amilla Luna',
        specilization: 'Nurse',
        username:'@amilia_lu',
        email:'a-luna@usahospital.com',
        timezone: '2:21PM Local Time',
        image:'member1.png'
      },
      {
        id: 2,
        name: 'Pavel Benedict',
        specilization: 'Doctor',
        username:'@pavel-b',
        email:'pavel-b@usahospital.com',
        timezone: '2:21PM Local Time',
        image:'member2.png'
      },
      {
        id: 3,
        name: 'Kenneth Roswald',
        specilization: 'Specilist',
        username:'@keneth',
        email:'keneth-ros@usahospital.com',
        timezone: '2:21PM Local Time',
        image:'member3.png'
      },
      {
        id: 4,
        name: 'Elizabeth Johnstone',
        specilization: 'Nurse',
        username:'@elizbeth',
        email:'elizbeth@usahospital.com',
        timezone: '2:21PM Local Time',
        image:'member4.png'
      },
      {
        id: 5,
        name: 'Ryan Garcia',
        specilization: 'Specilist',
        username:'@ryan_g',
        email:'ryan_g@usahospital.com',
        timezone: '2:21PM Local Time',
        image:'member5.png'
      },
    ]
  }
  export const speciality = [
    {"text":"Addiction Medicine", "value":1},
    {"text":"Adolescent Medicine", "value":2},
    {"text":"Adult Psychiatry", "value":3},
    {"text":"Aerospace Medicine", "value":4},
    {"text":"Allergy / Immunology", "value":5},
    {"text":"Allergy Medicine", "value":6},
    {"text":"Anesthesiology", "value":7},
    {"text":"Bariatric Surgery", "value":8},
    {"text":"Behavioral Medicine", "value":9},
    {"text":"Breast Surgery", "value":10},
    {"text":"Cardiac Electrophysiology", "value":11},
    {"text":"Cardiac Surgery", "value":12},
    {"text":"Cardiology", "value":13},
    {"text":"Cardiothoracic Surgery", "value":14},
    {"text":"Child Psychiatry", "value":15},
    {"text":"Colorectal Surgery", "value":16},
    {"text":"Critical Care Medicine", "value":17},
    {"text":"Critical Care Pediatrics", "value":18},
    {"text":"Dermatology", "value":19},
    {"text":"Dermatopathology", "value":20},
    {"text":"Diabetology", "value":21},
    {"text":"Diagnostic Radiology", "value":22},
    {"text":"Emergency Medicine", "value":23},
    {"text":"Endocrinology", "value":24},
    {"text":"ENT / Otolaryngology", "value":25},
    {"text":"Family Medicine", "value":26},
    {"text":"Foot & Ankle Orthopedics", "value":27},
    {"text":"Functional Medicine", "value":28},
    {"text":"Gastroenterology", "value":29},
    {"text":"General Practice", "value":30},
    {"text":"General Surgery", "value":31},
    {"text":"Geriatrics", "value":32},
    {"text":"Gynecologic Oncology", "value":33},
    {"text":"Gynecology", "value":34},
    {"text":"Hand Surgery", "value":35},
    {"text":"Head & Neck Surgery", "value":36},
    {"text":"Hematology", "value":37},
    {"text":"Hepatology", "value":38},
    {"text":"Holistic Medicine", "value":39},
    {"text":"Immunology", "value":40},
    {"text":"Infectious Disease Medicine", "value":41},
    {"text":"Internal Medicine", "value":42},
    {"text":"Internal Medicine / Pediatrics", "value":43},
    {"text":"Interventional Cardiology", "value":44},
    {"text":"Interventional Pain Management", "value":45},
    {"text":"Medical Genetics", "value":46},
    {"text":"Neonatology", "value":47},
    {"text":"Nephrology", "value":48},
    {"text":"Neurology", "value":49},
    {"text":"Neuroradiology", "value":50},
    {"text":"Neurosurgery", "value":51},
    {"text":"Nuclear Cardiology", "value":52},
    {"text":"Nuclear Medicine", "value":53},
    {"text":"Nursing", "value":54},
    {"text":"OBGYN / Obstetrics & Gynecology", "value":55},
    {"text":"Obstetrics", "value":56},
    {"text":"Obstetrics & Gynecology", "value":57},
    {"text":"Occupational Medicine", "value":58},
    {"text":"Oncology", "value":59},
    {"text":"Ophthalmology", "value":60},
    {"text":"Orthopedic Spine Surgery", "value":61},
    {"text":"Orthopedic Surgery", "value":62},
    {"text":"Osteopathic Medicine", "value":63},
    {"text":"Pain Management", "value":64},
    {"text":"Palliative Care", "value":65},
    {"text":"Pathology", "value":66},
    {"text":"Pediatric Cardiology", "value":67},
    {"text":"Pediatric Endocrinology", "value":68},
    {"text":"Pediatric Gastroenterology", "value":69},
    {"text":"Pediatric Hematology / Oncology", "value":70},
    {"text":"Pediatric Neurology", "value":71},
    {"text":"Pediatric Pulmonology", "value":72},
    {"text":"Pediatric Radiology", "value":73},
    {"text":"Pediatric Surgery", "value":74},
    {"text":"Pediatric", "value":75},
    {"text":"Pharmacy", "value":76},
    {"text":"Physiatrist", "value":77},
    {"text":"Physical Medicine & Rehabilitation", "value":78},
    {"text":"Plastic Surgery", "value":79},
    {"text":"Preventive Medicine", "value":80},
    {"text":"Psychiatry", "value":81},
    {"text":"Pulmonary Critical Care", "value":82},
    {"text":"Pulmonology", "value":83},
    {"text":"Radiation Oncology", "value":84},
    {"text":"Radiology", "value":85},
    {"text":"Reconstructive Orthopedic Surgery", "value":86},
    {"text":"Reproductive Endocrinology", "value":87},
    {"text":"Rheumatology", "value":88},
    {"text":"Sleep Medicine", "value":89},
    {"text":"Sports Medicine", "value":90},
    {"text":"Surgical Oncology", "value":91},
    {"text":"Thoracic Surgery", "value":92},
    {"text":"Transplant Surgery", "value":93},
    {"text":"Trauma Surgery", "value":94},
    {"text":"Urgent Care", "value":95},
    {"text":"Urogynecology", "value":96},
    {"text":"Urology", "value":97},
    {"text":"Vascular & Interventional Radiology", "value":98},
    {"text":"Vascular Surgery", "value":99},
  ]