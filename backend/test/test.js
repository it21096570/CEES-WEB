
jest.setTimeout(9000000);

describe("Summary Service Test ", () => {

    test("find CIR", async () => {
        const expectedValue = 0.03;
        const taskExpenseForMonth = { monthYear: 'December 2023', totalExpense: '2500' };
        const incomeForMonth = { monthYear: 'December 2023', totalIncome: 90000 };

        const CIR = await reportService.findCIR(taskExpenseForMonth, incomeForMonth)

        expect(CIR).toEqual(expectedValue);
    });

});