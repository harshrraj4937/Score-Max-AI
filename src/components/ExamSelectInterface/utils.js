export const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Very Hard': return 'text-red-400';
    case 'Hard': return 'text-orange-400';
    case 'Medium': return 'text-yellow-400';
    default: return 'text-green-400';
  }
};

