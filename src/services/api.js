// src/services/api.js
// Mock API functions - In a real app, these would be actual API calls.
export const API = {
  // --- User Endpoints ---
  createUser: async (userData) => {
    console.log("Creating user with data:", userData);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    return { ...userData, userId: `user_${Date.now()}` };
  },
  findUserById: async (userId) => {
    console.log("Finding user by ID:", userId);
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      userId,
      firstName: "John",
      middleName: "Doe",
      lastName: "Smith",
      email: "john.smith@example.com",
      documentNumber: "12345678",
      documentType: "NATIONAL_ID",
      address: { postalCode: "00100", town: "Nairobi", postalAddress: "P.O. Box 123", phone: "0712345678" },
      phone: { countryCode: "+254", phoneNumber: "712345678" },
      organization: { organizationId: "org_1", name: "BroadMax", email: "info@broadmax.com", countryCode: "+254", phoneNumber: "722000000", postalCode: "00100", town: "Nairobi", postalAddress: "P.O. Box 456", createdBy: "admin" },
      role: "User"
    };
  },
  findUserByOrganizationId: async (organizationId) => {
    console.log("Finding users for organization:", organizationId);
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      { userId: "user_1", firstName: "Alice", lastName: "Wanjiru", email: "alice@example.com", role: "Admin" },
      { userId: "user_2", firstName: "Bob", lastName: "Otieno", email: "bob@example.com", role: "User" },
    ];
  },

  // --- Organization Endpoints ---
  createOrganization: async (orgData) => {
    console.log("Creating organization:", orgData);
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...orgData, organizationId: `org_${Date.now()}` };
  },
  findOrganizationById: async (organizationId) => {
    console.log("Finding organization by ID:", organizationId);
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      organizationId,
      name: "Sample Org",
      email: "contact@sample.org",
      countryCode: "+254",
      phoneNumber: "700111222",
      postalCode: "00200",
      town: "Nairobi",
      postalAddress: "P.O. Box 789",
      createdBy: "admin"
    };
  },
  
  // --- Member Endpoints ---
  createMember: async (memberData) => {
    console.log("Creating member:", memberData);
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...memberData, userId: `user_${Date.now()}`, memberId: `mem_${Date.now()}` };
  },
  // Update the createMemberFromUser function
  createMemberFromUser: async (userData) => {
    console.log("Creating member from user:", userData);
    await new Promise(resolve => setTimeout(resolve, 500));
    // Use the passed user data instead of fetching again
    return { ...userData, memberId: `mem_${Date.now()}` };
  },
  findMemberByOrganizationId: async (organizationId) => {
    console.log("Finding members for organization:", organizationId);
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      { userId: "user_3", memberId: "mem_1", firstName: "Charlie", lastName: "Kamau", email: "charlie@example.com", type: "PERMANENT", status: "ACTIVE" },
      { userId: "user_4", memberId: "mem_2", firstName: "Diana", lastName: "Akinyi", email: "diana@example.com", type: "TEMPORARY", status: "ACTIVE" },
    ];
  },
  findMemberById: async (memberId) => {
    console.log("Finding member by ID:", memberId);
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
        userId: "user_3",
        firstName: "Charlie",
        lastName: "Kamau",
        email: "charlie@example.com",
        memberId: memberId,
        type: "PERMANENT",
        status: "ACTIVE",
        canLogIn: true,
        organization: { organizationId: "org_1", name: "BroadMax" }
    };
  },

  // --- Loanee Endpoints ---
  createLoanee: async (loaneeData) => {
      console.log("Creating loanee:", loaneeData);
      await new Promise(resolve => setTimeout(resolve, 500));
      return { ...loaneeData, userId: `user_${Date.now()}`, loaneeId: `loan_${Date.now()}` };
  },
  findLoaneeByOrganizationId: async (organizationId) => {
    console.log("Finding loanees for org:", organizationId);
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
        { loaneeId: "loan_1", userId: "user_5", firstName: "Eve", lastName: "Mwangi", status: "ACTIVE" },
    ];
  },

  // --- Loan Request Endpoints ---
  getLoans: async () => {
    console.log("Getting all loans");
    await new Promise(resolve => setTimeout(resolve, 500));
    return [{
        id: "loanreq_1",
        loanee: { user: { firstName: "Eve", lastName: "Mwangi" } },
        amountRequested: 5000,
        amountDisbursed: 4800,
        status: "DISBURSED",
        requestDate: new Date().toISOString().split('T')[0],
    }];
  },
  getLoanRepayments: async () => {
    console.log("Getting loan repayments");
    await new Promise(resolve => setTimeout(resolve, 500));
    return [{
        id: "repay_1",
        loanRequest: { id: "loanreq_1", loanee: { user: { firstName: "Eve", lastName: "Mwangi" } } },
        amount: 1000,
        balance: 4000,
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMode: "MPESA",
    }];
  }
};