import MoviesList from '^/app/components/movie/MoviesList';

export default async function Homepage(): Promise<JSX.Element | null> {
  return (
    <div className="container mx-auto p-4">
      <MoviesList />
    </div>
  );
}
