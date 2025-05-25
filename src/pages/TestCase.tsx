
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CheckCircle, XCircle, Clock, User, Calendar, FileText, Play } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

const TestCase = () => {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [stepStatuses, setStepStatuses] = useState<string[]>([]);

  // Mock test case data - in real app this would come from API
  const testCase = {
    id: "TC-001",
    title: "ACH Transfer - Successful Payment Processing",
    module: "ACH Payments",
    priority: "High",
    status: "In Progress",
    assignee: "Sarah Johnson",
    created: "2024-01-10",
    lastUpdated: "2024-01-15",
    description: "This test case verifies the end-to-end flow of a successful ACH transfer between checking accounts, including proper validation, processing, and confirmation messaging.",
    preconditions: [
      "User must have valid login credentials",
      "Source account must have sufficient funds ($500+)",
      "Destination account must be valid and active",
      "ACH transfer limits must be within daily/monthly thresholds"
    ],
    steps: [
      {
        step: 1,
        action: "User should enter payment details",
        data: "Amount: $250.00, From: Checking (****1234), To: Savings (****5678), Memo: 'Monthly transfer'",
        expected: "Payment form validates all fields and displays confirmation screen with transaction summary"
      },
      {
        step: 2,
        action: "System should successfully submit the payment",
        data: "User clicks 'Submit Payment' button",
        expected: "Success message should get displayed with payment confirmation"
      },
      {
        step: 3,
        action: "User should make note of the payment ID",
        data: "Payment ID displayed on success screen",
        expected: "Payment ID format: PAY-ACH-YYYYMMDD-XXXXXX (e.g., PAY-ACH-20240115-001234)"
      },
      {
        step: 4,
        action: "System should display payment status",
        data: "Check payment status in transaction history",
        expected: "Payment status should display as 'Entered' in the transaction list"
      }
    ]
  };

  const executeStep = (stepIndex: number, status: 'pass' | 'fail') => {
    const newStatuses = [...stepStatuses];
    newStatuses[stepIndex] = status;
    setStepStatuses(newStatuses);
    
    if (status === 'pass' && stepIndex === currentStep) {
      setCurrentStep(Math.min(stepIndex + 1, testCase.steps.length - 1));
    }
  };

  const getStepStatus = (stepIndex: number) => {
    if (stepStatuses[stepIndex] === 'pass') return 'passed';
    if (stepStatuses[stepIndex] === 'fail') return 'failed';
    if (stepIndex === currentStep) return 'current';
    if (stepIndex < currentStep) return 'skipped';
    return 'pending';
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'failed': return <XCircle className="h-5 w-5 text-red-600" />;
      case 'current': return <Play className="h-5 w-5 text-blue-600" />;
      default: return <Clock className="h-5 w-5 text-slate-400" />;
    }
  };

  const getStepBadgeColor = (status: string) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-700 border-green-200';
      case 'failed': return 'bg-red-100 text-red-700 border-red-200';
      case 'current': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="h-6 w-px bg-slate-300" />
              <div>
                <h1 className="text-lg font-semibold text-slate-900">{testCase.title}</h1>
                <p className="text-sm text-slate-600">{testCase.id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                {testCase.module}
              </Badge>
              <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                {testCase.priority}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Test Case Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">Test Case Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-700 leading-relaxed">{testCase.description}</p>
                
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Preconditions</h3>
                  <ul className="space-y-2">
                    {testCase.preconditions.map((condition, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600 text-sm">{condition}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Test Steps */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">Test Steps</CardTitle>
                <CardDescription>Execute each step and mark as Pass/Fail</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {testCase.steps.map((step, index) => {
                  const status = getStepStatus(index);
                  return (
                    <div key={index} className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                      status === 'current' ? 'border-blue-200 bg-blue-50/50' :
                      status === 'passed' ? 'border-green-200 bg-green-50/50' :
                      status === 'failed' ? 'border-red-200 bg-red-50/50' :
                      'border-slate-200 bg-white/50'
                    }`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {getStepIcon(status)}
                          <h3 className="font-semibold text-slate-900">Step {step.step}</h3>
                          <Badge className={getStepBadgeColor(status)}>
                            {status === 'current' ? 'Current' : 
                             status === 'passed' ? 'Passed' :
                             status === 'failed' ? 'Failed' : 'Pending'}
                          </Badge>
                        </div>
                        {status === 'current' && (
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-700 border-green-300 hover:bg-green-50"
                              onClick={() => executeStep(index, 'pass')}
                            >
                              Pass
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-700 border-red-300 hover:bg-red-50"
                              onClick={() => executeStep(index, 'fail')}
                            >
                              Fail
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="font-medium text-slate-900">Action: </span>
                          <span className="text-slate-700">{step.action}</span>
                        </div>
                        {step.data && (
                          <div>
                            <span className="font-medium text-slate-900">Test Data: </span>
                            <span className="text-slate-700">{step.data}</span>
                          </div>
                        )}
                        <div>
                          <span className="font-medium text-slate-900">Expected Result: </span>
                          <span className="text-slate-700">{step.expected}</span>
                        </div>
                      </div>

                      {stepStatuses[index] === 'fail' && (
                        <div className="mt-4">
                          <Textarea
                            placeholder="Enter failure notes or defect details..."
                            className="bg-red-50 border-red-200"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Test Details */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-slate-900">Test Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-4 w-4 text-slate-500" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Assignee</p>
                    <p className="text-sm text-slate-600">{testCase.assignee}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Created</p>
                    <p className="text-sm text-slate-600">{testCase.created}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-slate-500" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Last Updated</p>
                    <p className="text-sm text-slate-600">{testCase.lastUpdated}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="h-4 w-4 text-slate-500" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Total Steps</p>
                    <p className="text-sm text-slate-600">{testCase.steps.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-slate-900">Execution Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Completed</span>
                    <span className="font-medium text-slate-900">
                      {stepStatuses.filter(s => s === 'pass').length} / {testCase.steps.length}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(stepStatuses.filter(s => s === 'pass').length / testCase.steps.length) * 100}%` 
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">
                        {stepStatuses.filter(s => s === 'pass').length}
                      </div>
                      <div className="text-xs text-slate-600">Passed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-red-600">
                        {stepStatuses.filter(s => s === 'fail').length}
                      </div>
                      <div className="text-xs text-slate-600">Failed</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCase;
