
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, Filter, FileText, CheckCircle, Clock, AlertCircle, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const testCases = [
    {
      id: "TC-001",
      title: "ACH Transfer - Successful Payment Processing",
      module: "ACH Payments",
      priority: "High",
      status: "Passed",
      assignee: "Sarah Johnson",
      lastUpdated: "2024-01-15",
      steps: 4,
      description: "Verify successful ACH transfer between checking accounts with proper validation and confirmation"
    },
    {
      id: "TC-002", 
      title: "Wire Transfer - International Payment Validation",
      module: "Wire Payments",
      priority: "Critical",
      status: "In Progress",
      assignee: "Mike Chen",
      lastUpdated: "2024-01-14",
      steps: 6,
      description: "Test international wire transfer with currency conversion and compliance checks"
    },
    {
      id: "TC-003",
      title: "Internal Transfer - Same Account Validation",
      module: "Transfers",
      priority: "Medium",
      status: "Failed",
      assignee: "Emily Davis",
      lastUpdated: "2024-01-13",
      steps: 3,
      description: "Validate internal transfers between savings and checking accounts"
    },
    {
      id: "TC-004",
      title: "ACH Return Processing - Invalid Account",
      module: "ACH Payments",
      priority: "High",
      status: "Pending",
      assignee: "David Wilson",
      lastUpdated: "2024-01-12",
      steps: 5,
      description: "Test ACH return processing when destination account is invalid or closed"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Passed": return "bg-green-100 text-green-700 border-green-200";
      case "Failed": return "bg-red-100 text-red-700 border-red-200";
      case "In Progress": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Pending": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-700 border-red-200";
      case "High": return "bg-orange-100 text-orange-700 border-orange-200";
      case "Medium": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Low": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Passed": return <CheckCircle className="h-4 w-4" />;
      case "Failed": return <AlertCircle className="h-4 w-4" />;
      case "In Progress": return <Clock className="h-4 w-4" />;
      case "Pending": return <Clock className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="h-6 w-px bg-slate-300" />
              <h1 className="text-xl font-semibold text-slate-900">Test Case Dashboard</h1>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
              <Plus className="h-4 w-4 mr-2" />
              New Test Case
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl font-bold text-slate-900">24</CardTitle>
              <CardDescription className="text-slate-600">Total Test Cases</CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl font-bold text-green-600">18</CardTitle>
              <CardDescription className="text-slate-600">Passed</CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl font-bold text-blue-600">3</CardTitle>
              <CardDescription className="text-slate-600">In Progress</CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl font-bold text-red-600">3</CardTitle>
              <CardDescription className="text-slate-600">Failed</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900">Filter Test Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Search test cases..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Module" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modules</SelectItem>
                  <SelectItem value="transfers">Transfers</SelectItem>
                  <SelectItem value="ach">ACH Payments</SelectItem>
                  <SelectItem value="wire">Wire Payments</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="passed">Passed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="progress">In Progress</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Test Cases List */}
        <div className="space-y-4">
          {testCases.map((testCase) => (
            <Card key={testCase.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <Link to={`/test-case/${testCase.id}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge variant="outline" className="font-mono text-xs">
                          {testCase.id}
                        </Badge>
                        <Badge className={getPriorityColor(testCase.priority)}>
                          {testCase.priority}
                        </Badge>
                        <Badge className="bg-slate-100 text-slate-700 border-slate-200">
                          {testCase.module}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg text-slate-900 group-hover:text-blue-700 transition-colors">
                        {testCase.title}
                      </CardTitle>
                      <CardDescription className="mt-2 text-slate-600">
                        {testCase.description}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(testCase.status)}
                      <Badge className={getStatusColor(testCase.status)}>
                        {testCase.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <div className="flex items-center space-x-4">
                      <span>Assignee: <span className="font-medium text-slate-900">{testCase.assignee}</span></span>
                      <span>{testCase.steps} steps</span>
                    </div>
                    <span>Updated: {testCase.lastUpdated}</span>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
