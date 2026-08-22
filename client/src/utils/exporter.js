/**
 * Utility to convert tabular JSON data to downloadable CSV file
 */
export const exportToCSV = (filename, data, columns) => {
  if (!data || !data.length) return;

  const headers = columns ? columns.map((col) => col.header) : Object.keys(data[0]);
  const keys = columns ? columns.map((col) => col.key) : Object.keys(data[0]);

  const csvRows = [];
  csvRows.push(headers.map((h) => `"${h.replace(/"/g, '""')}"`).join(','));

  for (const row of data) {
    const values = keys.map((key) => {
      let val = row[key];
      if (val === null || val === undefined) val = '';
      if (typeof val === 'object') val = JSON.stringify(val);
      return `"${String(val).replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(','));
  }

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Utility to open branded, printable Salary Slip PDF view
 */
export const printPayslipPDF = (payslip) => {
  const printWindow = window.open('', '_blank', 'width=850,height=1100');
  if (!printWindow) return;

  const monthYear = payslip.period || payslip.month || 'Current Month';
  const empName = payslip.employeeName || payslip.name || 'Employee';
  const empId = payslip.employeeId || payslip.empId || 'DAY-EMP-001';
  const designation = payslip.designation || payslip.role || 'Software Engineer';
  const department = payslip.department || payslip.dept || 'Engineering';

  const basic = payslip.basicPay || payslip.basic || 50000;
  const hra = payslip.hra || 20000;
  const allowances = payslip.allowances || payslip.specialAllowance || 15000;
  const gross = payslip.grossPay || basic + hra + allowances;

  const pf = payslip.pf || payslip.providentFund || 3600;
  const tax = payslip.tax || payslip.incomeTax || 4500;
  const deductions = payslip.deductions || payslip.totalDeductions || pf + tax;
  const netPay = payslip.netPay || payslip.netSalary || gross - deductions;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Payslip - ${empName} (${monthYear})</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; margin: 0; padding: 40px; background: #fff; }
          .container { max-width: 750px; margin: 0 auto; border: 1px solid #cbd5e1; padding: 40px; border-radius: 8px; }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f59e0b; padding-bottom: 20px; margin-bottom: 30px; }
          .brand { font-size: 24px; font-weight: bold; color: #0f172a; }
          .subbrand { color: #f59e0b; }
          .title { font-size: 18px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #475569; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
          .info-block div { margin-bottom: 8px; font-size: 14px; }
          .info-block label { font-weight: 600; color: #64748b; display: inline-block; width: 120px; }
          table { width: 100%; border-collapse: collapse; margin-between: 30px; }
          th { background: #f8fafc; text-align: left; padding: 12px; font-size: 13px; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0; }
          td { padding: 12px; font-size: 14px; border-bottom: 1px solid #f1f5f9; }
          .amount { text-align: right; }
          .total-row td { font-weight: bold; background: #f8fafc; border-top: 2px solid #e2e8f0; }
          .net-pay-box { background: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px; padding: 20px; text-align: center; margin-top: 30px; }
          .net-pay-title { font-size: 14px; color: #92400e; font-weight: 600; text-transform: uppercase; }
          .net-pay-amount { font-size: 28px; color: #b45309; font-weight: bold; margin-top: 5px; }
          .footer { margin-top: 50px; display: flex; justify-content: space-between; align-items: flex-end; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 20px; }
          .signatory { text-align: right; }
          .sign-line { width: 150px; border-bottom: 1px solid #cbd5e1; margin-bottom: 5px; display: inline-block; }
          @media print {
            body { padding: 0; }
            .container { border: none; padding: 0; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div>
              <div class="brand">Day<span class="subbrand">flow</span> HRMS</div>
              <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Human Resource Management System</div>
            </div>
            <div class="title">Payslip — ${monthYear}</div>
          </div>

          <div class="grid">
            <div class="info-block">
              <div><label>Employee Name:</label> <strong>${empName}</strong></div>
              <div><label>Employee ID:</label> ${empId}</div>
              <div><label>Department:</label> ${department}</div>
            </div>
            <div class="info-block">
              <div><label>Designation:</label> ${designation}</div>
              <div><label>Pay Period:</label> ${monthYear}</div>
              <div><label>Payment Mode:</label> Bank Transfer</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Earnings</th>
                <th class="amount">Amount (₹)</th>
                <th>Deductions</th>
                <th class="amount">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Basic Salary</td>
                <td class="amount">₹${basic.toLocaleString('en-IN')}</td>
                <td>Provident Fund (PF)</td>
                <td class="amount">₹${pf.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td>House Rent Allowance (HRA)</td>
                <td class="amount">₹${hra.toLocaleString('en-IN')}</td>
                <td>Income Tax / TDS</td>
                <td class="amount">₹${tax.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td>Special Allowances</td>
                <td class="amount">₹${allowances.toLocaleString('en-IN')}</td>
                <td>Other Deductions</td>
                <td class="amount">₹0</td>
              </tr>
              <tr class="total-row">
                <td>Gross Earnings</td>
                <td class="amount">₹${gross.toLocaleString('en-IN')}</td>
                <td>Total Deductions</td>
                <td class="amount">₹${deductions.toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>

          <div class="net-pay-box">
            <div class="net-pay-title">Net Salary Payable</div>
            <div class="net-pay-amount">₹${netPay.toLocaleString('en-IN')}</div>
          </div>

          <div class="footer">
            <div>
              This is a computer-generated payslip and does not require a physical signature.
            </div>
            <div class="signatory">
              <div class="sign-line"></div>
              <div>Authorized Signatory</div>
            </div>
          </div>
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
};
