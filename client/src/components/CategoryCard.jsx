function CategoryCard({ category, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative aspect-[16/10] overflow-hidden rounded-lg p-4 text-left transition hover:scale-[1.02]"
      style={{ backgroundColor: category.color }}
    >
      <span className="text-xl font-bold text-white md:text-2xl">
        {category.name}
      </span>

      <img
        src={category.image}
        alt=""
        className="absolute -right-3 -bottom-2 h-20 w-20 rotate-[25deg] rounded-md object-cover shadow-xl md:h-24 md:w-24"
      />
    </button>
  )
}

export default CategoryCard