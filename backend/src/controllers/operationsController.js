import Bin from '../models/Bin.js';
import Facility from '../models/Facility.js';

function binStatus({ fillLevel, gasPpm, tempC }) {
  if (fillLevel > 85 || gasPpm > 80 || tempC > 45) return 'Critical';
  if (fillLevel > 70 || gasPpm > 40) return 'Warning';
  return 'Normal';
}

export async function listBins(req, res) {
  res.json({ bins: await Bin.find().lean() });
}

export async function updateBin(req, res) {
  const changes = { ...req.body };
  if ('fillLevel' in changes || 'gasPpm' in changes || 'tempC' in changes) {
    const current = await Bin.findOne({ id: req.params.id }).lean();
    if (!current) return res.status(404).json({ message: 'Bin not found' });
    changes.status = binStatus({ ...current, ...changes });
  }
  const bin = await Bin.findOneAndUpdate({ id: req.params.id }, changes, { new: true, runValidators: true });
  if (!bin) return res.status(404).json({ message: 'Bin not found' });
  res.json({ bin });
}

export async function listFacilities(req, res) {
  res.json({ facilities: await Facility.find().lean() });
}

export async function disinfectFacility(req, res) {
  const facility = await Facility.findOneAndUpdate({ id: req.params.id }, {
    overallScore: 98, hygieneStatus: 'Optimal', lastDisinfected: 'Just now', nextCycle: 'In 60 mins',
    uvcStatus: 'Completed (Cycle 4)', odorPpm: 0.05, soapDispenserPercent: 100, waterTankPercent: 95
  }, { new: true });
  if (!facility) return res.status(404).json({ message: 'Facility not found' });
  res.json({ facility });
}