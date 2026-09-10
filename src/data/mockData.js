export const leaveTypes = [
  { id: "annual", name: "Annual Leave", color: "#1f5d3a" },
  { id: "casual", name: "Casual Leave", color: "#3f8f5f" },
  { id: "medical", name: "Medical Leave", color: "#b8842e" },
  { id: "nopay", name: "No-Pay Leave", color: "#a8483c" },
  { id: "duty", name: "Duty Leave", color: "#6f9e8a" },
];

export const holidays = [
  { date: "2026-09-10", name: "Binara Full Moon Poya Day", type: "Public" },
  { date: "2026-09-25", name: "Company Founders' Day", type: "Company" },
  { date: "2026-10-05", name: "Milad-un-Nabi", type: "Public" },
  { date: "2026-10-27", name: "Vap Full Moon Poya Day", type: "Public" },
];

export const departments = ["Engineering", "Finance", "HR", "Operations", "Marketing"];

export const employees = [
  { id: "EMP-1001", name: "Abiramy Lingeswaran", department: "Engineering", designation: "Software Engineer", manager: "Rajan Kumar", status: "Active", joined: "2026-01-12" },
  { id: "EMP-1002", name: "Nilani Perera", department: "Engineering", designation: "QA Analyst", manager: "Rajan Kumar", status: "Active", joined: "2024-03-04" },
  { id: "EMP-1003", name: "Suresh Fernando", department: "Finance", designation: "Accountant", manager: "Dilani Silva", status: "Active", joined: "2022-06-19" },
  { id: "EMP-1004", name: "Kavya Wickramasinghe", department: "Marketing", designation: "Marketing Executive", manager: "Dilani Silva", status: "Probation", joined: "2026-06-01" },
  { id: "EMP-1005", name: "Ahamed Rizvi", department: "Operations", designation: "Operations Lead", manager: "Rajan Kumar", status: "Active", joined: "2021-11-23" },
];

export const leaveBalances = {
  "EMP-1001": [
    { typeId: "annual", entitled: 14, carryForward: 3, adjustments: 1, used: 5, pending: 2 },
    { typeId: "casual", entitled: 7, carryForward: 0, adjustments: 0, used: 2, pending: 0 },
    { typeId: "medical", entitled: 10, carryForward: 0, adjustments: 0, used: 1, pending: 0 },
    { typeId: "nopay", entitled: 0, carryForward: 0, adjustments: 0, used: 0, pending: 0 },
    { typeId: "duty", entitled: 5, carryForward: 0, adjustments: 0, used: 0, pending: 0 },
  ],
};

export const leaveRequests = [
  { id: "LR-3001", employeeId: "EMP-1001", employee: "Abiramy Lingeswaran", department: "Engineering", typeId: "annual", start: "2026-09-14", end: "2026-09-16", days: 3, half: null, reason: "Family function in Jaffna", status: "Pending", appliedOn: "2026-09-05" },
  { id: "LR-3002", employeeId: "EMP-1002", employee: "Nilani Perera", department: "Engineering", typeId: "medical", start: "2026-09-08", end: "2026-09-08", days: 1, half: null, reason: "Fever, medical certificate attached", status: "Approved", appliedOn: "2026-09-07" },
  { id: "LR-3003", employeeId: "EMP-1004", employee: "Kavya Wickramasinghe", department: "Marketing", typeId: "casual", start: "2026-09-11", end: "2026-09-11", days: 0.5, half: "Morning", reason: "Bank work", status: "Pending", appliedOn: "2026-09-06" },
  { id: "LR-3004", employeeId: "EMP-1005", employee: "Ahamed Rizvi", department: "Operations", typeId: "annual", start: "2026-08-20", end: "2026-08-22", days: 3, half: null, reason: "Personal travel", status: "Rejected", appliedOn: "2026-08-10" },
  { id: "LR-3005", employeeId: "EMP-1001", employee: "Abiramy Lingeswaran", department: "Engineering", typeId: "casual", start: "2026-07-02", end: "2026-07-02", days: 1, half: null, reason: "House move", status: "Approved", appliedOn: "2026-06-25" },
];

export const notifications = [
  { id: 1, text: "Your leave request LR-3001 is awaiting manager approval.", time: "2h ago" },
  { id: 2, text: "HR added a new company holiday: Founders' Day.", time: "1d ago" },
  { id: 3, text: "Leave request LR-3002 was approved.", time: "2d ago" },
];

export const orgStats = {
  totalEmployees: 128,
  onLeaveToday: 9,
  pendingRequests: 14,
  monthlyRequests: 47,
};

export const departmentUsage = [
  { department: "Engineering", used: 62, headcount: 40 },
  { department: "Finance", used: 28, headcount: 18 },
  { department: "HR", used: 12, headcount: 8 },
  { department: "Operations", used: 44, headcount: 32 },
  { department: "Marketing", used: 21, headcount: 15 },
];

export const auditLog = [
  { id: 1, user: "HR Officer — Dilani Silva", action: "Leave Balance Adjustment", record: "EMP-1024", previous: "8 Days", next: "10 Days", date: "2026-08-31" },
  { id: 2, user: "System Admin", action: "Role Permission Updated", record: "Manager Role", previous: "View-only reports", next: "View + export reports", date: "2026-08-28" },
  { id: 3, user: "Manager — Rajan Kumar", action: "Leave Approved", record: "LR-2988", previous: "Pending", next: "Approved", date: "2026-08-26" },
];
