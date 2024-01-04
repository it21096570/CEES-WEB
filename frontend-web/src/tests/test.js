jest.setTimeout(9000000);

describe('calculateTotalCost', () => {
    const calculateTotalCost = (filteredInvoices, setTotalCost, parseFn) => {
        const total = filteredInvoices.reduce((acc, invoice) => {
            return acc + parseFn(invoice.ordertotal);
        }, 0);
        setTotalCost(total);
    };

    it('should calculate the total cost correctly', () => {
        // Mock data
        const filteredInvoices = [
            { ordertotal: '10.00' },
            { ordertotal: '20.50' },
            { ordertotal: '15.75' },
        ];

        // Mock setTotalCost function
        const setTotalCostMock = jest.fn();

        // Mock parseFloat function
        const parseFloatMock = jest.fn((value) => parseFloat(value));

        calculateTotalCost(filteredInvoices, setTotalCostMock, parseFloatMock);

        expect(setTotalCostMock).toHaveBeenCalledWith(10.00 + 20.50 + 15.75);

        expect(parseFloatMock).toHaveBeenCalledWith('10.00');
        expect(parseFloatMock).toHaveBeenCalledWith('20.50');
        expect(parseFloatMock).toHaveBeenCalledWith('15.75');
    });
});
