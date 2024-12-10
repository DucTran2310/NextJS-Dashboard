import { db } from "@vercel/postgres";

async function listInvoices() {
	const client = await db.connect();
	try {
		const data = await client.sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;
		return data.rows;
	} finally {
		// Make sure to release the client
		client.release();
	}
}

export async function GET() {
	try {
		return Response.json(await listInvoices());
	} catch (error) {
		console.log('Error:', error); // Thêm log để debug
		return Response.json({ error: 'Database query failed' }, { status: 500 });
	}
}
