"use client"

import React, { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

import { GradesPage } from "../../../register/grades/page"

export function AcademicInfoTab() {
  const [, setFormData] = useState({
    highSchool: "",
    gpa: "",
    satScore: "",
    actScore: "",
    toeflScore: "",
    ieltsScore: "",
    gradeLevel: "",
    graduationYear: "",
    majorInterest: "",
    extracurriculars: "",
    achievements: ""
  })

  useEffect(() => {
    async function fetchAcademicData() {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (error) {
          console.error("Error fetching user:", error.message)
          return
        }
        
        if (user) {
          // Get academic info from academic_profile table if exists
          const { data: academicData } = await supabase
            .from('academic_profiles')
            .select('*')
            .eq('user_id', user.id)
            .single()
            
          if (academicData) {
            setFormData({
              highSchool: academicData.high_school || "",
              gpa: academicData.gpa || "",
              satScore: academicData.sat_score || "",
              actScore: academicData.act_score || "",
              toeflScore: academicData.toefl_score || "",
              ieltsScore: academicData.ielts_score || "",
              gradeLevel: academicData.grade_level || "",
              graduationYear: academicData.graduation_year || "",
              majorInterest: academicData.major_interest || "",
              extracurriculars: academicData.extracurriculars || "",
              achievements: academicData.achievements || ""
            })
          }
        }
      } catch (error) {
        console.error("Error fetching academic data:", error)
      }
    }
    
    fetchAcademicData()
  }, [])

    
  return (
    <div>    
      <GradesPage />
    </div> 
  )
}
