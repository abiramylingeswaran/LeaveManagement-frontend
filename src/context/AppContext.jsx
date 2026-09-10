import { createContext, useContext, useState, useMemo } from "react";
import { leaveRequests as initialRequests } from "../data/mockData";

const AppContext = createContext(null);

const roleProfiles = {
  employee: { name: "Abiramy Lingeswaran", id: "EMP-1001", title: "Software Engineer" },
  manager: { name: "Rajan Kumar", id: "MGR-201", title: "Engineering Manager" },
  hr: { name: "Dilani Silva", id: "HR-104", title: "HR Officer" },
  admin: { name: "System Admin", id: "SYS-001", title: "Administrator" },
};

export function AppProvider({ children }) {
  const [role, setRole] = useState("employee");
  const [requests, setRequests] = useState(initialRequests);

  const updateRequestStatus = (id, status) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const addRequest = (request) => {
    setRequests((prev) => [
      { ...request, id: `LR-${3000 + prev.length + 100}`, status: "Pending", appliedOn: new Date().toISOString().slice(0, 10) },
      ...prev,
    ]);
  };

  const value = useMemo(
    () => ({
      role,
      setRole,
      profile: roleProfiles[role],
      requests,
      updateRequestStatus,
      addRequest,
    }),
    [role, requests]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
