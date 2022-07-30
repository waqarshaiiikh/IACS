import noteContext from "./noteContext";
import React, { useState } from "react";
import { Api } from "../../integration/apiCall";

const NoteState=(props)=>{
 
    const LOADING =  "Loading..." ;
    const [url, setUrl] = useState();
    const [username, setUsername] = useState( LOADING );
    const [university, setUniversity] = useState( LOADING );
    const [departmentName, setDepartmentName] = useState( LOADING );
    const [haveExperience, setHaveExperience] = useState([]);
    const [aboutUs, setAboutUs] = useState( LOADING );
    const [Signin, setSignin] = useState(true);
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
    const [ instruction  , set_instruction ] = useState(        );

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
        console.log(experience)
        setHaveExperience(experience);
    }

    const gettingBasicData = async()=>{

        const profileInstance = await (await Data.profile);
        const basicInfo = await profileInstance.client;
        const username =      (await profileInstance.username);
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
        setUsername      (username  ||  LOADING );
        setDepartmentName(departmentName);
        set_instruction  (instruction1)


    }

       



    return (
        <noteContext.Provider value={{
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
              instruction, set_instruction , options, setOptions, 
        }} >
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;