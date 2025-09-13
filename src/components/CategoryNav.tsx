import { LandButton } from "@suminhan/land-design";

interface CategoryItem {
  key: string;
  label: string;
}

interface CategoryNavProps {
  categories: CategoryItem[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onUpload?: () => void;
}

export default function CategoryNav({
  categories,
  selectedCategory,
  onCategoryChange,
  onUpload
}: CategoryNavProps) {
  return (
    <nav className="sticky top-0 z-10 px-4">
      <div className="flex justify-between items-center bg-white opacity-90 backdrop-blur-lg h-12">
        <div className="flex gap-4">
          {categories.map((category) => (
            <button
              key={category.key}
              className={`py-2 rounded-lg transition-colors cursor-pointer ${selectedCategory === category.key ? "font-bold" : ""
                }`}
              onClick={() => onCategoryChange(category.key)}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {onUpload && (
          <LandButton
            type={'background'}
            onClick={onUpload}
            text="新建"
            icon={ <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
           
           
          </LandButton>
        )}
      </div>
    </nav>
  );
}