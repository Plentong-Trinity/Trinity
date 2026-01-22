import { Card, CardContent } from "@/components/ui/card"
import { Flame, Shield, BookOpen } from "lucide-react"

export function MassSection() {
  return (
    <section id="mass-schedule" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mass Schedule</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground">
            "I was glad when they said to me, 'Let us go to the house of the Lord!'".<br/>
            - Psalm 122:1
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="flex flex-col gap-8">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Flame className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">GOD DAMN Mass</h3>
                <p className="text-center text-muted-foreground text-sm">
                  <strong className="font-semibold">English mass:</strong> Sat 5pm <br/>
                  <strong className="font-semibold">Chinese mass:</strong> Sat 8pm | Sun 8 am <br/>
                  <strong className="font-semibold">BM mass:</strong> Sun 11.30am (updated)
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Damn Mass</h3>
                <p className="text-center text-muted-foreground text-base">
                  <strong className="font-semibold">English mass:</strong> Sat 5pm <br/>
                  <strong className="font-semibold">Chinese mass:</strong> Sat 8pm | Sun 8 am <br/>
                  <strong className="font-semibold">BM mass:</strong> Sun 11.30am (updated)
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardContent className="pt-6">
              <div className="mb-4 flex justify-center">
                <div className="p-3 rounded-full bg-primary/10">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Special GOD DAMN mass</h3>
                <p className="text-center text-muted-foreground px-8 py-20">
                  No Special mass. <br/> 
                  Please contact us for special arrangements.
                </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
