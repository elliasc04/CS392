interface TermSelectorProps {
  selectedTerm: string;
  onTermChange: (term: string) => void;
}

const TermSelector = ({ selectedTerm, onTermChange }: TermSelectorProps) => {
  const terms = ['Fall', 'Winter', 'Spring'];

  return (
    <div className="flex justify-center gap-4 p-6">
      {terms.map((term) => (
        <button
          key={term}
          onClick={() => onTermChange(term)}
          className={`px-6 py-2 rounded-sm transition-colors ${
            selectedTerm === term
              ? 'bg-gray-300 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {term}
        </button>
      ))}
    </div>
  );
};

export default TermSelector;
