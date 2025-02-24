export function Tags({ tags }: { tags: { id: number; name: string }[] }) {
  return (
    <div className="flex gap-1.5">
      {tags?.map((tag, index) => (
        <div key={tag.id}>
          <span className="tag">
            {tag?.name}
            {index !== tags.length - 1 && ","}
          </span>
        </div>
      ))}
    </div>
  );
}
