import { useState } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Spinner } from '../../../components/ui/Spinner';
import { createJob } from '../../../api/jobApi';
import './NewJobModal.css';

export function NewJobModal({ isOpen, onClose, onJobCreated }) {
  const [form, setForm] = useState({
    title: '', department: '', location: '', type: 'Full-time', openings: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.department) {
      setError('Title and department are required.');
      return;
    }
    try {
      setLoading(true);
      setError('');
      const newJob = await createJob(form);
      onJobCreated?.(newJob);
      onClose();
      setForm({ title: '', department: '', location: '', type: 'Full-time', openings: 1 });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Post New Job" size="md">
      <div className="new-job-form">
        {error && <div className="new-job-form__error">{error}</div>}

        <div className="new-job-form__field">
          <label>Job Title *</label>
          <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Senior React Developer" />
        </div>
        <div className="new-job-form__field">
          <label>Department *</label>
          <input name="department" value={form.department} onChange={handleChange} placeholder="e.g. Engineering" />
        </div>
        <div className="new-job-form__field">
          <label>Location</label>
          <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Bangalore, IN or Remote" />
        </div>
        <div className="new-job-form__row">
          <div className="new-job-form__field">
            <label>Type</label>
            <select name="type" value={form.type} onChange={handleChange}>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>
          <div className="new-job-form__field">
            <label>Openings</label>
            <input type="number" name="openings" value={form.openings} onChange={handleChange} min="1" />
          </div>
        </div>

        <div className="new-job-form__actions">
          <button className="new-job-form__cancel" onClick={onClose}>Cancel</button>
          <button className="new-job-form__submit" onClick={handleSubmit} disabled={loading}>
            {loading ? <Spinner size="sm" /> : 'Post Job'}
          </button>
        </div>
      </div>
    </Modal>
  );
}