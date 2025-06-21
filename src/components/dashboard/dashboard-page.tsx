import { FileText, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RecentArticles } from "@/components/dashboard/recent-article";

export function BlogDashboard() {
  return (
    <main className="flex-1 p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blog Dashboard</h1>
          <p className="text-muted-foreground">Manage your content and analytics</p>
        </div>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          New Article
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-1 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {/* You'll dynamically update this count later */}
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground mt-1">+5 from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Articles Section */}
      <RecentArticles />
    </main>
  );
}
