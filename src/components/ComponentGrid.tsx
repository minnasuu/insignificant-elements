import ComponentCard from './ComponentCard';
import EmptyState from './EmptyState';
import type { ComponentItem } from '../types';

interface ComponentGridProps {
  components: ComponentItem[];
  selectedCategory: string;
  onEdit?: (component: ComponentItem) => void;
  onDetail?: (component: ComponentItem) => void;
}

export default function ComponentGrid({
  components,
  selectedCategory,
  onEdit,
  onDetail,
}: ComponentGridProps) {
  // 如果没有组件，显示空状态
  if (components.length === 0) {
    return (
      <main className="px-4 py-6">
        <EmptyState category={selectedCategory} />
      </main>
    );
  }

  return (
    <main className="px-4 py-6">
      <div
        className="grid gap-4 max-w-7xl mx-auto"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
      >
        {components.map((component) => (
          <ComponentCard
            key={component.id}
            component={component}
            onEdit={onEdit}
            onDetail={onDetail}
          />
        ))}
      </div>
    </main>
  );
}