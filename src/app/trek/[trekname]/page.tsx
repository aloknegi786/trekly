type Props = {
  params: Promise<{
    trekname: string
  }>
}

export default async function TrekDetails({ params }: Props) {
  const { trekname } = await params;

  return (
    <div>
      {trekname} page
    </div>
  );
}