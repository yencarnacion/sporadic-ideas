import os

def build_translation_table(base_path):
    translation_table = {}

    for date_dir in os.listdir(base_path):
        date_path = os.path.join(base_path, date_dir)

        if os.path.isdir(date_path):
	    contents_file = f"{date_dir}.contents"
	    contents_file_path = os.path.join(date_path, contents_file)

            if os.path.isfile(contents_file_path):
	        with open(contents_file_path, "r") as contents:
		    for line in contents:
			doc_id, doc_type, date, _ = line.strip().split("\t")
			year, month = date[:4], date[4:6]
			doc_subpath = f"{year}-{month}/{doc_id[:-6]}/{doc_id[-6:-3]}/{doc_id[-3:]}"

                        page1_file = "00000001.tif"
			page1_path = os.path.join(date_path, doc_subpath, page1_file)

                        translation_table[doc_id] = page1_path

    return translation_table

def get_page1_path(document_id, translation_table):
    return translation_table.get(document_id, "Document not found")

if __name__ == "__main__":
    base_path = "data/patent/grant/yb_expanded/2021"
    translation_table = build_translation_table(base_path)

    document_id = "10888042"
    page1_path = get_page1_path(document_id, translation_table)
    print(f"Page 1 of Document {document_id} is located at: {page1_path}")

