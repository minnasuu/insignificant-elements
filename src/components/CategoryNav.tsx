interface CategoryItem {
  key: string;
  label: string;
}

interface CategoryNavProps {
  categories: CategoryItem[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onCreate?: () => void;
}

export default function CategoryNav({
  categories,
  selectedCategory,
  onCategoryChange,
  onCreate,
}: CategoryNavProps) {
  return (
    <nav className="sticky top-0 z-10 px-4">
      <div className="flex items-center justify-between gap-4 bg-white opacity-90 backdrop-blur-lg h-12">
        <div className="flex gap-4">
          {categories.map((category) => (
            <button
              key={category.key}
              className={`py-2 rounded-lg transition-colors cursor-pointer ${
                selectedCategory === category.key ? "font-bold" : ""
              }`}
              onClick={() => onCategoryChange(category.key)}
            >
              {category.label}
            </button>
          ))}
        </div>
        <div className="flex items-center">
          <button
            className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => onCreate?.()}
          >
            新建组件
          </button>
        </div>
      </div>
    </nav>
  );
}