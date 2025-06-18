"use client"

import { useEffect, useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQualifiedPrograms } from "@/hooks/fetchPrograms";
import { DashboardHeader } from "../components/dashboard-header";
import  Universities from "@/src/data/colleges/allcollegesinfo.json";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Clock, Heart, ExternalLink, BookOpen, School, Calendar, DollarSign, Filter} from "lucide-react";

export default function ProgramRecommendations() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedUniversity, setSelectedUniversity] = useState("all")
  const [favorites, setFavorites] = useState<number[]>([2, 5])
  const [activeTab, setActiveTab] = useState("all")
  const schoolsProfile = Universities

  const { allPrograms, loading } = useQualifiedPrograms()

  // Memoize safePrograms to avoid unnecessary re-renders
  const safePrograms = useMemo(() => Array.isArray(allPrograms) ? allPrograms : [], [allPrograms])

  // Only log when safePrograms is non-empty and changes
  useEffect(() => {
    if (safePrograms.length > 0) {
      console.log("All Programs (non-empty):", safePrograms)
    }
  }, [safePrograms])

  // Wait for programs to load or be non-empty
  if (loading || safePrograms.length === 0) {
    return <div className="flex justify-center items-center py-12">Loading programs...</div>
  }

  const filteredPrograms = safePrograms.filter((program, id) => {
    const matchesSearch =
      program.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.schoolName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || program.college === selectedCategory
    const matchesUniversity = selectedUniversity === "all" || program.schoolName === selectedUniversity
    const matchesFavorites = activeTab === "favorites" ? favorites.includes(id) : true
    const matchesTab = activeTab === "all" || (activeTab === "favorites" && matchesFavorites)

    return matchesSearch && matchesCategory && matchesUniversity && matchesTab
  })

  const toggleFavorite = (programId: number) => {
    setFavorites((prev) => (prev.includes(programId) ? prev.filter((id) => id !== programId) : [...prev, programId]))
  }

  const categories = ["all", ...Array.from(new Set(safePrograms.map((p) => p.college)))]
  const universities = ["all", ...Array.from(new Set(safePrograms.map((p) => p.schoolName)))]


const getSchoolProfile = (schoolName: string) => {
  return schoolsProfile.find(
    (school) => school.university_name.toLowerCase().includes(schoolName.toLowerCase())
  )
}

  return (
    <div className="space-y-6">
      < DashboardHeader />
      {/* Tabs and Filters */}
      <Card className="border-none shadow-lg overflow-hidden">
        <div className="bg-white dark:bg-gray-800">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="px-6 pt-4">
                <TabsList className="grid w-full grid-cols-2 h-11">
                  <TabsTrigger value="all" className="text-sm">
                    All Programs
                  </TabsTrigger>
                  <TabsTrigger value="favorites" className="text-sm">
                    Favorites
                  </TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
          </div>

          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search programs or universities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                      <SelectValue placeholder="Category" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center">
                      <School className="h-4 w-4 mr-2 text-gray-500" />
                      <SelectValue placeholder="University" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {universities.map((university) => (
                      <SelectItem key={university} value={university}>
                        {university === "all" ? "All Universities" : university.split(" ")[0] + "..."}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button variant="outline" size="icon" className="md:hidden">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">{filteredPrograms.length} programs found</p>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setSelectedUniversity("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Program Cards */}
      <div className="grid grid-cols-1 gap-6">
        {filteredPrograms.map((program, id) => (
          <Card key={id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex flex-col md:flex-row">
              {/* Left side - Program info */}
              <div className="flex-1 p-6">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{program.program}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{program.schoolName}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={favorites.includes(id) ? "text-red-500" : "text-gray-400"}
                    onClick={() => toggleFavorite(id)}
                  >
                    <Heart className={`h-5 w-5 ${favorites.includes(id) ? "fill-current" : ""}`} />
                  </Button>
                  <div className="flex-shrink-0 mr-4">
                    <Image
                      alt={program.schoolName}
                      width={96}
                      height={96}
                      src={getSchoolProfile(program.schoolName)?.logo_url || "/default-logo.png"} // fallback logo if not found
                      className="w-16 h-16 rounded-md object-cover"
                    />

                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4 mr-1" />
                    {getSchoolProfile(program.schoolName)?.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    {4}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    Deadline: {getSchoolProfile(program.schoolName)?.deadline}
                  </div>
                </div>

                {/* <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{program["specialRequirements"]}</p> */}

                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Additional Info</h4>
                  <div className="flex flex-wrap gap-1">
                  
                      <Badge variant="outline" className="text-xs bg-gray-100 dark:bg-gray-800">
                        {program["specialRequirements"]}
                      </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center text-sm">
                    <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{2000}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <School className="h-4 w-4 mr-1 text-gray-500" />
                    <span>Cutoff: {program.cutoffPoint }</span>
                  </div>
                </div>
              </div>

              {/* Right side - Match score and actions */}
              <div className="md:w-64 bg-gray-50 dark:bg-gray-800 p-6 flex flex-col items-center justify-between border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center">
                    <svg className="w-24 h-24">
                      <circle
                        className="text-gray-200 dark:text-gray-700"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="48"
                        cy="48"
                      />
                      <circle
                        className={`${
                          // round value for match score
                          Math.round(((1 - ((program.Aggregate)/program.cutoffPoint))*100)) >= 95
                            ? "text-green-500"
                            : Math.round((1 - ((program.Aggregate)/program.cutoffPoint))*100) >= 85
                              ? "text-blue-500"
                              : "text-yellow-500"
                        }`}
                        strokeWidth="8"
                        strokeDasharray={`${Math.round(((1 - ((program.Aggregate)/program.cutoffPoint))*100 / 100) * 251.2)} 251.2`}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="48"
                        cy="48"
                      />
                    </svg>
                    <span className="absolute text-2xl font-bold">{Math.round((1 - ((program.Aggregate)/program.cutoffPoint))*100)}%</span>
                  </div>
                  <p className="mt-2 text-sm font-medium">Match Score</p>
                </div>

                <div className="w-full space-y-3 mt-6">
                  <Button className="w-full">Apply Now</Button>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredPrograms.length === 0 && (
        <Card className="border-none shadow-lg">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-3 mb-4">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No programs found</h3>
            <p className="text-gray-500 text-center max-w-md mb-6">
              We couldn&apos;t find any programs matching your current filters. Try adjusting your search criteria.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSelectedUniversity("all")
              }}
            >
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
