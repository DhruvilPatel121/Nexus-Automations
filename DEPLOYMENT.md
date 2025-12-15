# Deployment Guide for Hostinger

## Building for Static Export

This Next.js application is configured for static export, making it perfect for hosting on Hostinger without VPS or cloud hosting.

### Step 1: Build the Static Site

Run the following command in your project directory:

\`\`\`bash
npm run build
\`\`\`

This will create an `out` folder containing all static HTML, CSS, and JavaScript files.

### Step 2: Upload to Hostinger

1. **Via File Manager:**
   - Log into your Hostinger control panel
   - Navigate to File Manager
   - Go to the `public_html` directory (or your domain's root folder)
   - Delete existing files (optional, based on your setup)
   - Upload all contents from the `out` folder to `public_html`

2. **Via FTP:**
   - Use an FTP client (FileZilla, etc.)
   - Connect using credentials from Hostinger
   - Upload the entire `out` folder contents to `public_html`

### Step 3: Update Products

To add or modify products after deployment:

1. Edit the `data/products.json` file locally
2. Run `npm run build` to regenerate the static files
3. Upload only the updated files from the `out` folder to Hostinger

## Updating Products - JSON Structure

The `data/products.json` file controls all products. Here's the structure:

\`\`\`json
{
  "products": [
    {
      "id": "unique-id",
      "name": "Product Name",
      "description": "Product description",
      "image": "/path/to/image.jpg",
      "subProducts": [
        {
          "id": "sub-id",
          "name": "Sub Product Name",
          "description": "Sub product description",
          "image": "/path/to/image.jpg",
          "subProducts": [
            {
              "id": "sub-sub-id",
              "name": "Sub Sub Product",
              "description": "Description",
              "image": "/path/to/image.jpg"
            }
          ]
        }
      ]
    }
  ]
}
\`\`\`

### Adding New Products

1. Add a new object to the `products` array
2. Include `id`, `name`, `description`, `image`, and optionally `subProducts`
3. Rebuild and redeploy

### Adding Images

1. Place images in the `public` folder (e.g., `public/images/product1.jpg`)
2. Reference in JSON as: `"/images/product1.jpg"`
3. Upload images to Hostinger in the same folder structure

## Domain Configuration

After uploading:
- Your site will be available at your Hostinger domain
- All routes work with static export (/, /products, /contact)
- No server-side code runs - everything is static HTML

## Performance Tips

- Optimize images before uploading (use WebP format when possible)
- Keep the `products.json` file reasonable in size
- Consider using a CDN for images if you have many products

## Troubleshooting

**404 Errors:**
- Ensure trailing slashes are enabled (configured in `next.config.mjs`)
- Check that all files from `out` folder are uploaded

**Images Not Loading:**
- Verify image paths match the folder structure
- Ensure images are uploaded to the correct directory
- Check file permissions in Hostinger File Manager

**Product Updates Not Showing:**
- Clear browser cache
- Ensure you rebuilt the site after editing JSON
- Verify the updated files were uploaded
