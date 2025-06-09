import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Image from "next/image";

import  Universities from "../../../../src/data/colleges/allcollegesinfo.json";

export default function PopularUniversities() {
  const universities = Universities
  return (
    <Card className="border-null shadow-lg">
      <CardContent className="p-0">
        <div className="border-b border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold">Popular Universities</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Explore top universities while we prepare your recommendations
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {universities.map((university, index) => (
              <div
                key={index}
                className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex-shrink-0 mr-4">
                  <Image
                    alt=""
                    width={96}
                    height={96}
                    src={university.logo_url || "/placeholder.svg"}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{university.university_name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{university.location}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{university.acceptance_rate} Acceptance rate</p>
                </div>
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline">View All Universities</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
