import { Category } from "./types"

interface CategorySelectionProps
{
  categories: Category[]
  selectedCategories: number[]
  onSelect: (id: number) => void
}

export function CategorySelection({ categories, selectedCategories, onSelect }: CategorySelectionProps)
{
  return (
    <div className="categorySelection">
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={`categoryButton
            ${selectedCategories.includes(category.id)
            ? "selected"
            : "unselected"}
          )`}
        >
          <img
            src={category.image}
            alt={category.name}
            className="categoryImage"
          />
          {/* <span className="categoryName">
            {category.name}
          </span> */}
        </div>
      ))}
    </div>
  )
}

