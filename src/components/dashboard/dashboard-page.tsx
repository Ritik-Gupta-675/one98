import { FileText, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RecentArticles } from "@/components/dashboard/recent-article";

export function BlogDashboard() {
  return (
    <main className="flex-1 p-4 md:p-10 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight mb-2 drop-shadow-sm">
            Blog Dashboard
          </h1>
          <p className="text-lg text-blue-700/80 font-medium">
            Manage your content and analytics
          </p>
        </div>
        <a
          href="/dashboard/articles/create"
          className="flex items-center text-sm text-primary hover:underline"
        >
          <Button className="gap-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 shadow-xl px-6 py-2.5 rounded-xl text-white font-semibold text-base border-0">
            <PlusCircle className="h-5 w-5" />
            <span>New Article</span>
          </Button>
        </a>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-14">
        <Card className="rounded-2xl border border-blue-200/60 shadow-xl hover:shadow-2xl transition-shadow bg-white/95 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold text-blue-700">
              Total Articles
            </CardTitle>
            <div className="p-3 rounded-xl bg-blue-100">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold text-blue-900">--</div>
            <p className="text-xs text-blue-500 mt-2 font-medium">
              +5 from last month
            </p>
          </CardContent>
        </Card>
        {/* ...Add more stat cards here for a fuller dashboard look if needed... */}
      </div>

      {/* Divider */}
      <div className="border-t border-blue-200/60 mb-10" />

      {/* Recent Articles Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-blue-900 drop-shadow-sm">
          Recent Articles
        </h2>
        <RecentArticles />
      </section>
    </main>
  );
}
