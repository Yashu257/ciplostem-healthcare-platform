# 📚 Medical Documents Directory

## Purpose

This directory contains the PDF documents that form the knowledge base for the CiploStem AI Healthcare Assistant.

## Instructions

### 1. Add Your PDF Documents Here

Place all medical PDFs in this directory:

```
documents/
├── product_monograph.pdf
├── manufacturing_process.pdf
├── clinical_trial_data.pdf
├── womac_vas_analysis.pdf
├── knee_oa_treatment_protocol.pdf
├── patient_eligibility_criteria.pdf
└── ... (add more PDFs)
```

### 2. Supported Document Types

The AI system works best with:

- **Product Monographs**: Detailed product information
- **Clinical Trial Data**: Research findings, WOMAC/VAS scores
- **Manufacturing Processes**: GMP workflows, quality control
- **Treatment Protocols**: Dosage, administration procedures
- **Patient Guidelines**: Eligibility criteria, safety information
- **Research Papers**: Mechanism of action, scientific evidence
- **Regulatory Documents**: Approvals, certifications

### 3. Document Requirements

✅ **Good:**
- Text-based PDFs (searchable)
- Clear, well-formatted content
- Medical/scientific documentation
- English language (or your target language)
- File size < 50MB per document

❌ **Avoid:**
- Scanned images without OCR
- Password-protected PDFs
- Corrupted files
- Non-medical content
- Duplicate documents

### 4. File Naming Best Practices

Use descriptive names:

```
✅ Good:
- ciplostem_product_monograph_v2.pdf
- clinical_trial_phase3_womac_results.pdf
- manufacturing_gmp_process_flow.pdf

❌ Avoid:
- document1.pdf
- file.pdf
- untitled.pdf
```

### 5. Ingest Documents

After adding PDFs, run the ingestion script:

```bash
# From backend directory
npm run ingest
```

This will:
1. Parse all PDFs in this directory
2. Split content into semantic chunks
3. Generate embeddings
4. Store in vector database

### 6. Verify Ingestion

Check that documents were processed:

```bash
curl http://localhost:5000/api/documents/stats
```

Expected response:
```json
{
  "success": true,
  "data": {
    "name": "ciplostem_medical_docs",
    "documentCount": 150,
    "initialized": true
  }
}
```

### 7. Update Documents

To add new documents or update existing ones:

1. Add/replace PDFs in this directory
2. Run `npm run ingest` again
3. The system will process all documents

**Note:** Re-ingestion will replace the existing knowledge base.

## Document Categories

The AI automatically categorizes documents:

- **product_monograph**: Product information
- **manufacturing**: Manufacturing processes
- **clinical_trial**: Clinical research data
- **branding**: Marketing/launch materials
- **general**: Other medical content

## Privacy & Security

⚠️ **Important:**

- Do NOT commit sensitive patient data
- Do NOT include PHI (Protected Health Information)
- Do NOT include proprietary information without authorization
- Ensure compliance with HIPAA and data protection regulations

## Example Documents

For testing purposes, you can use:

- Sample clinical trial reports
- Public domain medical research
- De-identified case studies
- Educational medical content

## Troubleshooting

### No documents found

- Verify PDFs are directly in this directory (not in subdirectories)
- Check file extensions are `.pdf` (lowercase)
- Ensure files are not corrupted

### Ingestion fails

- Check PDF is not password-protected
- Verify PDF contains extractable text
- Try with a smaller test document first
- Check backend logs for specific errors

### AI not using document content

- Verify ingestion completed successfully
- Check document count in stats endpoint
- Ensure questions are relevant to document content
- Try more specific queries

## Need Help?

See the main SETUP_GUIDE.md for detailed instructions.
