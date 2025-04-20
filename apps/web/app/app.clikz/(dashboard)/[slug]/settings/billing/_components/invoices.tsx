import { DownloadIcon } from "lucide-react";

import { Button } from "@clikz/ui/components/ui/button";
import { Card, CardFooter, CardHeader } from "@clikz/ui/components/ui/card";

const Invoices = () => {
  return (
    <Card>
      <CardHeader className="border-b-2">
        <h2 className="text-xl font-bold">Invoices</h2>
        <p className="text-muted-foreground">View and download your invoices</p>
      </CardHeader>

      {/* Invoices Table */}
      <div className="p-6">
        {/* If there are no invoices 
        <div className="text-center py-8">
          <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <FileText className="h-6 w-6 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium mb-2">No invoices yet</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Your invoices will appear here once you upgrade to a paid plan or
            make a purchase.
          </p>
        </div>
            */}

        {/* If there are invoices, uncomment this section
         */}

        <CardFooter className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Date</th>
                <th className="text-left py-3 px-4 font-medium">Invoice</th>
                <th className="text-left py-3 px-4 font-medium">Amount</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-right py-3 px-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">Apr 15, 2025</td>
                <td className="py-3 px-4">INV-001</td>
                <td className="py-3 px-4">$19.00</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Paid
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="ghost" size="icon">
                    <DownloadIcon />
                  </Button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Mar 15, 2025</td>
                <td className="py-3 px-4">INV-002</td>
                <td className="py-3 px-4">$19.00</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Paid
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="ghost" size="icon">
                    <DownloadIcon />
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </CardFooter>
      </div>
    </Card>
  );
};

export default Invoices;
