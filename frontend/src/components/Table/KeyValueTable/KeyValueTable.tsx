interface KeyValueTableProps {
  data: Record<string, any>;
  className?: string;
  rowClassName?: string;
  keyClassName?: string;
  valueClassName?: string;
}

export const KeyValueTable: React.FC<KeyValueTableProps> = ({ data }) => {
  return (
    <table>
      <tbody>
        {Object.entries(data).map(([key, value]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{value !== null && value !== undefined ? value : "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
