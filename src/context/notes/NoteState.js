import noteContext from "./noteContext";
import React, { useState } from "react";
import { Api, apiCAll } from "../../integration/apiCall";



const NoteState=(props)=>{

    const [UserType, setUserType] = useState(JSON.parse(localStorage.getItem('UserType')) || "student");

    // workspace for student starts==========================================================

    const [url              , setUrl            ] = useState();
    const [username         , setUsername       ] = useState("");
    const [university       , setUniversity     ] = useState(  );
    const [departmentName   , setDepartmentName ] = useState(  );
    const [haveExperience   , setHaveExperience ] = useState([]);
    const [aboutUs          , setAboutUs        ] = useState(  );
    
    
    
    const [Signin, setSignin] = useState(JSON.parse(localStorage.getItem('Signin')));
    const [DATA, setDATA] = useState();

    //states used in Profile Data js file
    const [ DOB          , setDOB          ] = useState( null   );
    const [ phoneNumber  , set_phoneNumber ] = useState( "+92"  );
    const [ enrollment   , set_enrollment  ] = useState( "NED/" );
    const [ department   , set_department  ] = useState( ""     );
    const [ year         , set_year        ] = useState( ""     );
    const [ semester     , set_semester    ] = useState( ""     );
    const [ CGPA         , set_CGPA        ] = useState( ""     );
    const [ gender       , set_gender      ] = useState( ""     );
    const [ address      , set_address     ] = useState( ""     );
    const [ github       , set_github      ] = useState( ""     );
    const [ linkedin     , set_linkedin    ] = useState( ""     );
    const [ instruction  , set_instruction ] = useState( ""     );

    //states used  for skill Data 
    const [options, setOptions] = useState([]);
    const [haveSkills, setHaveSkills] = useState([]);



    const Data = Api.getApi();


    const gettingData=async()=>{

        await gettingBasicData();
        await gettingSkillData();
        await gettingExperienceData();
        await gettingPicData();
    }
    
    const gettingSkillData =async ()=>{
        const skillInstance = await Data.skill;
        const skill = await skillInstance.client;
        const skillOptions = await skillInstance.options;
        setOptions       (skillOptions);
        setHaveSkills    (skill);
    }  
    
    const gettingPicData =async ()=>{
        const pic = await (await Data.picture).url;
        setUrl  (pic);
    }

    const gettingExperienceData =async ()=>{
        const experience = await (await Data.experience).client;
        setHaveExperience(experience);
    }

    const gettingBasicData = async()=>{

        const profileInstance = await (await Data.profile);
        const basicInfo = await profileInstance.client;
        const username =      (await profileInstance.getUsername(basicInfo));
        const departmentName = await profileInstance.getDepartmentName(basicInfo.department);
        const instruction1  = await profileInstance.instruction;
        setUniversity    (basicInfo.university)
        setAboutUs       (basicInfo.aboutUs)
        setDOB           (basicInfo.DOB)
        set_phoneNumber  (basicInfo.phoneNumber)
        set_enrollment   (basicInfo.enrollment)
        set_department   (basicInfo.department)
        set_year         (basicInfo.year)
        set_semester     (basicInfo.semester)
        set_CGPA         (basicInfo.CGPA)
        set_gender       (basicInfo.gender)
        set_address      (basicInfo.address)
        set_github       (basicInfo.github)
        set_linkedin     (basicInfo.linkedin)
        setUsername      (username  );
        setDepartmentName(departmentName);
        set_instruction  (instruction1)


    }




    const a = {
        gettingData: async () => { await gettingData() },
        gettingBasicData: async () => { await gettingBasicData() },
        gettingSkillData: async () => { await gettingSkillData() },
        gettingPicData: async () => { await gettingPicData() },
        gettingExperienceData: async () => { await gettingExperienceData() },
        url, setUrl, username, setUsername, university, setUniversity,
        departmentName, setDepartmentName, haveExperience, setHaveExperience
        , aboutUs, setAboutUs, haveSkills, setHaveSkills, Signin, setSignin, DATA, setDATA
        , DOB, setDOB, phoneNumber, set_phoneNumber, enrollment, set_enrollment, department,
          set_department, year, set_year, semester, set_semester, CGPA, set_CGPA, gender, set_gender,
          address, set_address, github, set_github, linkedin, set_linkedin, 
          instruction, set_instruction , options, setOptions, UserType, setUserType
    };

    // workspace for student END----------------------------------------




    //workspace of industry starts=============================================

    
    const [ hrName       , set_hrName      ] = useState(    );
    const [ website      , set_website     ] = useState(    );
    const [ CompanyName  , set_CompanyName ] = useState(    );
    const [ haveService  , setHaveService] = useState([]);
    const [skilloptions, setSkillOptions] = useState(JSON.parse(localStorage.getItem('Skill_options')) || []);// for industry

    const gettingServiceData =async ()=>{
        const serviceInstance = await Data.service;
        const services = await serviceInstance.client;
        const serviceOptions = await serviceInstance.options;
        console.log(services)
        setOptions       (serviceOptions);
        setHaveService    (services);
    }  

    
    const gettingIndBasicData = async()=>{

        const profileInstance = await (await Data.orgProfile);
        const basicInfo = await profileInstance.client;
        const instruction1  = await profileInstance.instruction;
        console.log(basicInfo)
        set_instruction  (instruction1)
        setAboutUs       (basicInfo.aboutUs)
        set_phoneNumber  (basicInfo.phoneNumber)
        set_address      (basicInfo.address)
        set_linkedin     (basicInfo.linkedin)
        set_hrName       (basicInfo.hrName)
        set_website      (basicInfo.website)
        set_CompanyName  (basicInfo.CompanyName)

    }

    const gettingSkillOption = async ()=>{
        if( skilloptions?.length === 0 )
        { 
           return apiCAll('/api/user/profile/skillOption', 'get').then(
                (skillOptions) => {
                    setSkillOptions( skillOptions.data || []);   
                    console.log(skillOptions.data)
                    localStorage.setItem('Skill_options', JSON.stringify(skillOptions.data));
                    return true;
                }
            )
        }

    }

    const gettingIndData = async () => {

        await gettingIndBasicData();
        await gettingServiceData();
        // await gettingExperienceData();
        await gettingPicData();
        await gettingSkillOption();
    }



    const industry ={
        gettingIndData: async () => { await gettingIndData() },
        gettingIndBasicData: async () => { await gettingIndBasicData() },
        gettingServiceData: async () => { await gettingServiceData() },
        gettingSkillOption: async () => { await gettingSkillOption() },
        
          aboutUs, setAboutUs, phoneNumber, set_phoneNumber, address, set_address,
          linkedin, set_linkedin, instruction, set_instruction , options, setOptions,
          hrName, set_hrName, website, set_website ,  CompanyName ,  haveService  , setHaveService
          , set_CompanyName  , skilloptions, setSkillOptions    
    };





    // workspace for industry END=============================================
   

    return (
        <noteContext.Provider value={{...a, industry: {...industry}}} >
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;