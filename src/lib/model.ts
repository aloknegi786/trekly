import mongoose from 'mongoose';

export function ensureModelsRegistered() {
    if (!mongoose.models.User) {
        require('@/models/User');
    }
    if (!mongoose.models.Trek) {
        require('@/models/Trek');
    }
    if (!mongoose.models.Booking) {
        require('@/models/Booking');
    }
}