# Industrial Solutions Website For Pix Technology By Dhruvil Bhuva

A professional industrial automation website built with Next.js, designed by Dhruvil Bhuva aesthetic and functionality.

## Features

- ✅ **Siemens-Inspired Design**: Exact color scheme (#009999 teal) and professional layout
- ✅ **Hierarchical Product Structure**: Products → Sub-Products → Sub-Sub-Products
- ✅ **JSON-Based Product Management**: Easy updates without code changes
- ✅ **Fully Responsive**: Mobile, tablet, and desktop optimized
- ✅ **Static Export Ready**: Deploy to Hostinger without VPS
- ✅ **Three Main Pages**: Home, Products, Contact
- ✅ **Professional Contact Form**: Complete with validation

## Project Structure

\`\`\`
├── app/
│ ├── page.tsx # Home/Landing page
│ ├── products/page.tsx # Dynamic product hierarchy
│ ├── contact/page.tsx # Contact form
│ ├── layout.tsx # Main layout
│ └── globals.css # Siemens color theme
├── components/
│ ├── header.tsx # Navigation header
│ └── footer.tsx # Footer component
├── data/
│ └── products.json # Product database (8 main products)
└── public/ # Static assets
\`\`\`

## Getting Started

### Development

\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Building for Production

\`\`\`bash
npm run build
\`\`\`

This creates an `out` folder with static files ready for Hostinger.

## Product Management

### Current Products (8 Main Categories)

1. Automation & Control
2. Drives & Motors
3. Power Distribution
4. Industrial Communication
5. Sensors & Instruments
6. Safety Technology
7. SCADA Software
8. Industrial PCs

### Adding/Updating Products

Edit `data/products.json`:

\`\`\`json
{
"id": "new-product",
"name": "New Product Category",
"description": "Description here",
"image": "/images/product.jpg",
"subProducts": [...]
}
\`\`\`

Then rebuild: `npm run build`

## Deployment to Hostinger

See `DEPLOYMENT.md` for detailed instructions.

**Quick Steps:**

1. Run `npm run build`
2. Upload `out` folder contents to Hostinger's `public_html`
3. Done! Your site is live.

## Responsive Design

- **Mobile**: < 768px - Single column, hamburger menu
- **Tablet**: 768px - 1024px - 2 column grid
- **Desktop**: > 1024px - 3-4 column grid, full navigation

## Color Scheme (Siemens-Inspired)

- Primary: #009999 (Teal)
- Primary Dark: #007373
- Primary Light: #00b8b8
- Background: #ffffff
- Foreground: #1a1a1a
- Muted: #e5e5e5

## Technologies

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Lucide React Icons
- Static Export

## Support

For issues or questions about deployment, refer to `DEPLOYMENT.md` or contact your development team.

## License

Proprietary - Shivvilon Solutions
