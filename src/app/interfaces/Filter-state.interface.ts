export interface FilterState {
    status: 'all' | 'completed' | 'pending';
    searchTerm: string;
}