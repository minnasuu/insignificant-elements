interface CategoryItem {
  key: string;
  label: string;
}

interface CategoryNavProps {
  categories: CategoryItem[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryNav({
  categories,
  selectedCategory,
  onCategoryChange
}: CategoryNavProps) {
  return (
    <nav className="sticky top-0 z-10 px-4">
      <div className="flex gap-4 bg-white opacity-90 backdrop-blur-lg h-12">
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
    </nav>
  );
}