import React, { useState, useId } from 'react';
import { 
  Wrench, 
  Send, 
  CheckCircle2, 
  ArrowLeft, 
  AlertCircle, 
  MessageSquare, 
  Phone, 
  RotateCcw
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData.ts';
import { InquiryFormData, InquiryFormErrors } from '../types/parts.ts';
import { buildWhatsAppUrl, formatInquiryMessage } from '../utils/whatsapp.ts';

interface PartInquiryFormProps {
  initialPartName?: string;
  onBackToHome: () => void;
}

export const PartInquiryForm: React.FC<PartInquiryFormProps> = ({
  initialPartName = '',
  onBackToHome,
}) => {
  // Unique accessible IDs using React useId()
  const nameId = useId();
  const phoneId = useId();
  const makeId = useId();
  const modelId = useId();
  const yearId = useId();
  const engineCodeId = useId();
  const partNeededId = useId();
  const branchId = useId();
  const urgencyId = useId();

  // Form State
  const [formData, setFormData] = useState<InquiryFormData>({
    customerName: '',
    phoneNumber: '',
    vehicleMake: '',
    vehicleModel: '',
    year: '',
    engineCode: '',
    partNeeded: initialPartName ? `Inquiring about: ${initialPartName}` : '',
    preferredBranch: 'Kadoma HQ (Shop 38, Baker St & Chaitezvi)',
    urgency: 'Normal',
  });

  // Touched state for each field
  const [touched, setTouched] = useState<Record<keyof InquiryFormData, boolean>>({
    customerName: false,
    phoneNumber: false,
    vehicleMake: false,
    vehicleModel: false,
    year: false,
    engineCode: false,
    partNeeded: !!initialPartName,
    preferredBranch: false,
    urgency: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState<string>('');

  // Inline Validation
  const validate = (): InquiryFormErrors => {
    const errors: InquiryFormErrors = {};

    if (!formData.customerName.trim()) {
      errors.customerName = 'Please enter your full name or workshop name';
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required for WhatsApp communication';
    } else if (formData.phoneNumber.replace(/\D/g, '').length < 8) {
      errors.phoneNumber = 'Please enter a valid phone number (e.g. 077 259 1965)';
    }

    if (!formData.vehicleMake) {
      errors.vehicleMake = 'Please select your vehicle make';
    }

    if (!formData.vehicleModel.trim()) {
      errors.vehicleModel = 'Vehicle model is required (e.g. Hilux Revo, Fit, Ranger)';
    }

    const currentYear = new Date().getFullYear();
    const yearNum = parseInt(formData.year, 10);
    if (!formData.year.trim()) {
      errors.year = 'Manufacture year is required';
    } else if (isNaN(yearNum) || yearNum < 1970 || yearNum > currentYear + 2) {
      errors.year = `Enter a valid year between 1970 and ${currentYear + 1}`;
    }

    if (!formData.partNeeded.trim()) {
      errors.partNeeded = 'Please describe the parts you need (e.g. shock absorbers, brake pads)';
    }

    if (!formData.preferredBranch) {
      errors.preferredBranch = 'Please select a preferred branch';
    }

    return errors;
  };

  const errors = validate();
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (
    field: keyof InquiryFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: keyof InquiryFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      customerName: true,
      phoneNumber: true,
      vehicleMake: true,
      vehicleModel: true,
      year: true,
      engineCode: true,
      partNeeded: true,
      preferredBranch: true,
      urgency: true,
    });

    if (!isValid) {
      const firstErrorField = document.querySelector('[data-invalid="true"]');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    let targetPhone = BUSINESS_INFO.primaryCleanPhone; // '263772591965'
    if (formData.preferredBranch.includes('Harare')) {
      targetPhone = '263778240751';
    } else if (formData.preferredBranch.includes('Karoi')) {
      targetPhone = '263775000113';
    }

    const messageText = formatInquiryMessage({
      customerName: formData.customerName,
      phoneNumber: formData.phoneNumber,
      vehicleMake: formData.vehicleMake,
      vehicleModel: formData.vehicleModel,
      year: formData.year,
      engineCode: formData.engineCode,
      partNeeded: formData.partNeeded,
      preferredBranch: formData.preferredBranch,
      urgency: formData.urgency,
    });

    const whatsappUrl = buildWhatsAppUrl(targetPhone, messageText);
    setLastWhatsAppUrl(whatsappUrl);
    setSubmitted(true);

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleReset = () => {
    setFormData({
      customerName: '',
      phoneNumber: '',
      vehicleMake: '',
      vehicleModel: '',
      year: '',
      engineCode: '',
      partNeeded: '',
      preferredBranch: 'Kadoma HQ (Shop 38, Baker St & Chaitezvi)',
      urgency: 'Normal',
    });
    setTouched({
      customerName: false,
      phoneNumber: false,
      vehicleMake: false,
      vehicleModel: false,
      year: false,
      engineCode: false,
      partNeeded: false,
      preferredBranch: false,
      urgency: false,
    });
    setSubmitted(false);
  };

  return (
    <div className="py-12 md:py-16 bg-[#061026] text-slate-100 min-h-[calc(100vh-140px)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-sm font-bold text-white px-4 py-2.5 rounded-xl bg-blue-900/80 hover:bg-blue-800 border border-blue-600/60 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-red-400" />
            <span>Return to Home & Catalog</span>
          </button>

          <span className="text-xs font-mono text-blue-300 hidden sm:inline">
            Direct Dispatch · Kadoma HQ · Harare · Karoi
          </span>
        </div>

        {/* Success Confirmation Card */}
        {submitted ? (
          <div className="bg-[#0b1b3e] border-2 border-blue-600 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="w-16 h-16 rounded-2xl bg-white border-2 border-[#0f296b] flex items-center justify-center text-[#0f296b] mb-6 shadow-xl">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>

            <span className="text-xs font-black uppercase tracking-widest text-white bg-red-600 px-3 py-1 rounded-full shadow-sm">
              Inquiry Dispatched Successfully
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-white mt-3 uppercase tracking-tight">
              Thank You, {formData.customerName}!
            </h2>

            <p className="text-sm sm:text-base text-slate-200 mt-2 leading-relaxed max-w-2xl">
              Your vehicle specifications and part requirements have been formatted into a priority WhatsApp message for our sales & technical counter.
            </p>

            {/* Inquiry Summary Review Box */}
            <div className="mt-6 p-5 rounded-2xl bg-[#07132c] border border-blue-800 space-y-2.5 text-xs">
              <div className="flex justify-between border-b border-blue-900 pb-2 font-medium">
                <span className="text-blue-300">Vehicle:</span>
                <span className="text-white font-black">
                  {formData.year} {formData.vehicleMake} {formData.vehicleModel}
                </span>
              </div>
              {formData.engineCode && (
                <div className="flex justify-between border-b border-blue-900 pb-2 font-medium">
                  <span className="text-blue-300">Engine Code:</span>
                  <span className="text-slate-200 font-bold">{formData.engineCode}</span>
                </div>
              )}
              <div className="flex justify-between border-b border-blue-900 pb-2 font-medium">
                <span className="text-blue-300">Preferred Branch:</span>
                <span className="text-white font-bold">{formData.preferredBranch}</span>
              </div>
              <div className="flex justify-between border-b border-blue-900 pb-2 font-medium">
                <span className="text-blue-300">Urgency:</span>
                <span className={formData.urgency === 'Urgent' ? 'text-red-400 font-black' : 'text-slate-200'}>
                  {formData.urgency}
                </span>
              </div>
              <div className="pt-1">
                <span className="text-blue-300 block mb-1">Part Description:</span>
                <p className="text-slate-100 bg-[#0b1b3e] p-3 rounded-xl border border-blue-800 italic">
                  "{formData.partNeeded}"
                </p>
              </div>
            </div>

            {/* Actions for User */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <a
                href={lastWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-black uppercase text-white bg-red-600 hover:bg-red-500 shadow-xl shadow-red-950/60 transition cursor-pointer text-xs tracking-wider"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Re-open WhatsApp Chat</span>
              </a>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-white bg-blue-900 hover:bg-blue-800 border border-blue-600 transition cursor-pointer text-xs"
              >
                <RotateCcw className="w-4 h-4 text-blue-300" />
                <span>Submit Another Part Request</span>
              </button>

              <button
                onClick={onBackToHome}
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3.5 text-blue-300 hover:text-white transition text-xs font-bold"
              >
                Back to Catalog
              </button>
            </div>
          </div>
        ) : (
          /* Main Form Card */
          <div className="bg-[#0b1b3e] border-2 border-blue-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Header info */}
            <div className="border-b border-blue-800/80 pb-6 mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-wider mb-2 shadow-sm">
                <Wrench className="w-3.5 h-3.5" />
                <span>Official Sourcing Desk</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
                Request a <span className="text-red-500">Spare Part</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                Provide your vehicle specs below. Submitting automatically formats your request onto our official WhatsApp desk for instant stock checks & pricing.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Row 1: Customer Name & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Customer Name */}
                <div data-invalid={touched.customerName && !!errors.customerName}>
                  <label 
                    htmlFor={nameId} 
                    className="block text-xs font-black uppercase tracking-wider text-slate-200 mb-1.5"
                  >
                    Customer / Workshop Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id={nameId}
                      type="text"
                      value={formData.customerName}
                      onChange={(e) => handleChange('customerName', e.target.value)}
                      onBlur={() => handleBlur('customerName')}
                      placeholder="e.g. Simba Moyo / Harare Auto Works"
                      className={`w-full bg-[#07132c] text-sm text-white placeholder-slate-400 px-4 py-3 rounded-xl border transition focus:outline-none ${
                        touched.customerName && errors.customerName
                          ? 'border-red-500 ring-1 ring-red-500 bg-red-950/20'
                          : 'border-blue-700 focus:border-red-500'
                      }`}
                    />
                  </div>
                  {touched.customerName && errors.customerName && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.customerName}</span>
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div data-invalid={touched.phoneNumber && !!errors.phoneNumber}>
                  <label 
                    htmlFor={phoneId} 
                    className="block text-xs font-black uppercase tracking-wider text-slate-200 mb-1.5"
                  >
                    WhatsApp Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-blue-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id={phoneId}
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleChange('phoneNumber', e.target.value)}
                      onBlur={() => handleBlur('phoneNumber')}
                      placeholder="e.g. 077 259 1965 or +263..."
                      className={`w-full bg-[#07132c] text-sm text-white placeholder-slate-400 pl-10 pr-4 py-3 rounded-xl border transition focus:outline-none ${
                        touched.phoneNumber && errors.phoneNumber
                          ? 'border-red-500 ring-1 ring-red-500 bg-red-950/20'
                          : 'border-blue-700 focus:border-red-500'
                      }`}
                    />
                  </div>
                  {touched.phoneNumber && errors.phoneNumber && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.phoneNumber}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Vehicle Make & Model & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Vehicle Make (Dropdown) */}
                <div data-invalid={touched.vehicleMake && !!errors.vehicleMake}>
                  <label 
                    htmlFor={makeId} 
                    className="block text-xs font-black uppercase tracking-wider text-slate-200 mb-1.5"
                  >
                    Vehicle Make <span className="text-red-500">*</span>
                  </label>
                  <select
                    id={makeId}
                    value={formData.vehicleMake}
                    onChange={(e) => handleChange('vehicleMake', e.target.value as InquiryFormData['vehicleMake'])}
                    onBlur={() => handleBlur('vehicleMake')}
                    className={`w-full bg-[#07132c] text-sm text-white px-3.5 py-3 rounded-xl border transition focus:outline-none appearance-none cursor-pointer ${
                      touched.vehicleMake && errors.vehicleMake
                        ? 'border-red-500 ring-1 ring-red-500 bg-red-950/20'
                        : 'border-blue-700 focus:border-red-500'
                    }`}
                  >
                    <option value="" disabled className="bg-[#0b1b3e] text-slate-400">
                      Select Make...
                    </option>
                    <option value="Toyota" className="bg-[#0b1b3e] text-white">Toyota</option>
                    <option value="Nissan" className="bg-[#0b1b3e] text-white">Nissan</option>
                    <option value="Honda" className="bg-[#0b1b3e] text-white">Honda</option>
                    <option value="Mazda" className="bg-[#0b1b3e] text-white">Mazda</option>
                    <option value="VW" className="bg-[#0b1b3e] text-white">VW (Volkswagen)</option>
                    <option value="Ford" className="bg-[#0b1b3e] text-white">Ford</option>
                    <option value="Other" className="bg-[#0b1b3e] text-white">Other Make</option>
                  </select>
                  {touched.vehicleMake && errors.vehicleMake && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.vehicleMake}</span>
                    </p>
                  )}
                </div>

                {/* Vehicle Model */}
                <div data-invalid={touched.vehicleModel && !!errors.vehicleModel}>
                  <label 
                    htmlFor={modelId} 
                    className="block text-xs font-black uppercase tracking-wider text-slate-200 mb-1.5"
                  >
                    Vehicle Model <span className="text-red-500">*</span>
                  </label>
                  <input
                    id={modelId}
                    type="text"
                    value={formData.vehicleModel}
                    onChange={(e) => handleChange('vehicleModel', e.target.value)}
                    onBlur={() => handleBlur('vehicleModel')}
                    placeholder="e.g. Hilux Revo / Fit / Ranger"
                    className={`w-full bg-[#07132c] text-sm text-white placeholder-slate-400 px-4 py-3 rounded-xl border transition focus:outline-none ${
                      touched.vehicleModel && errors.vehicleModel
                        ? 'border-red-500 ring-1 ring-red-500 bg-red-950/20'
                        : 'border-blue-700 focus:border-red-500'
                    }`}
                  />
                  {touched.vehicleModel && errors.vehicleModel && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.vehicleModel}</span>
                    </p>
                  )}
                </div>

                {/* Year (Number) */}
                <div data-invalid={touched.year && !!errors.year}>
                  <label 
                    htmlFor={yearId} 
                    className="block text-xs font-black uppercase tracking-wider text-slate-200 mb-1.5"
                  >
                    Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    id={yearId}
                    type="number"
                    min="1970"
                    max="2030"
                    value={formData.year}
                    onChange={(e) => handleChange('year', e.target.value)}
                    onBlur={() => handleBlur('year')}
                    placeholder="e.g. 2018"
                    className={`w-full bg-[#07132c] text-sm text-white placeholder-slate-400 px-4 py-3 rounded-xl border transition focus:outline-none ${
                      touched.year && errors.year
                        ? 'border-red-500 ring-1 ring-red-500 bg-red-950/20'
                        : 'border-blue-700 focus:border-red-500'
                    }`}
                  />
                  {touched.year && errors.year && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.year}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Row 3: Engine Code (Optional) & Urgency & Preferred Branch */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Engine Code (Optional) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label 
                      htmlFor={engineCodeId} 
                      className="block text-xs font-black uppercase tracking-wider text-slate-200"
                    >
                      Engine Code
                    </label>
                    <span className="text-[10px] text-blue-300 uppercase tracking-wider font-bold">Optional</span>
                  </div>
                  <input
                    id={engineCodeId}
                    type="text"
                    value={formData.engineCode}
                    onChange={(e) => handleChange('engineCode', e.target.value)}
                    placeholder="e.g. 1GD, 2TR, QR25, L13A"
                    className="w-full bg-[#07132c] text-sm text-white placeholder-slate-400 px-4 py-3 rounded-xl border border-blue-700 focus:border-red-500 focus:outline-none transition"
                  />
                </div>

                {/* Preferred Branch Dropdown */}
                <div data-invalid={touched.preferredBranch && !!errors.preferredBranch}>
                  <label 
                    htmlFor={branchId} 
                    className="block text-xs font-black uppercase tracking-wider text-slate-200 mb-1.5"
                  >
                    Preferred Branch <span className="text-red-500">*</span>
                  </label>
                  <select
                    id={branchId}
                    value={formData.preferredBranch}
                    onChange={(e) => handleChange('preferredBranch', e.target.value)}
                    onBlur={() => handleBlur('preferredBranch')}
                    className="w-full bg-[#07132c] text-sm text-white px-3.5 py-3 rounded-xl border border-blue-700 focus:border-red-500 focus:outline-none transition appearance-none cursor-pointer"
                  >
                    <option value="Kadoma HQ (Shop 38, Baker St & Chaitezvi)" className="bg-[#0b1b3e] text-white">
                      Kadoma HQ (Baker St & Chaitezvi)
                    </option>
                    <option value="Harare Branch (1 Londonderry Ave)" className="bg-[#0b1b3e] text-white">
                      Harare Branch (1 Londonderry Ave)
                    </option>
                    <option value="Karoi Branch (469 Jubilee Lane)" className="bg-[#0b1b3e] text-white">
                      Karoi Branch (469 Jubilee Lane)
                    </option>
                    <option value="Regional Courier Delivery (Marondera / Mutare / Kwekwe)" className="bg-[#0b1b3e] text-white">
                      Nationwide Delivery (Marondera, Mutare, Kwekwe)
                    </option>
                  </select>
                </div>

                {/* Urgency */}
                <div>
                  <label 
                    htmlFor={urgencyId}
                    className="block text-xs font-black uppercase tracking-wider text-slate-200 mb-1.5"
                  >
                    Urgency Level
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleChange('urgency', 'Normal')}
                      className={`py-3 px-3 rounded-xl text-xs font-black transition border cursor-pointer ${
                        formData.urgency === 'Normal'
                          ? 'bg-blue-600 text-white border-blue-400'
                          : 'bg-[#07132c] text-slate-300 border-blue-800 hover:text-white'
                      }`}
                    >
                      Normal
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChange('urgency', 'Urgent')}
                      className={`py-3 px-3 rounded-xl text-xs font-black transition border flex items-center justify-center gap-1 cursor-pointer ${
                        formData.urgency === 'Urgent'
                          ? 'bg-red-600 text-white border-red-400 shadow-md'
                          : 'bg-[#07132c] text-slate-300 border-blue-800 hover:text-red-400'
                      }`}
                    >
                      <span>Urgent</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 4: Part Needed (Textarea) */}
              <div data-invalid={touched.partNeeded && !!errors.partNeeded}>
                <div className="flex items-center justify-between mb-1.5">
                  <label 
                    htmlFor={partNeededId} 
                    className="block text-xs font-black uppercase tracking-wider text-slate-200"
                  >
                    Part(s) Needed & Details <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] text-blue-300">
                    Include part numbers, side, or symptoms
                  </span>
                </div>
                <textarea
                  id={partNeededId}
                  rows={4}
                  value={formData.partNeeded}
                  onChange={(e) => handleChange('partNeeded', e.target.value)}
                  onBlur={() => handleBlur('partNeeded')}
                  placeholder="e.g. Need front KYB shock absorbers (pair), New Blu brake pads, and major service kit for 2018 Hilux Revo. Please provide pricing and availability."
                  className={`w-full bg-[#07132c] text-sm text-white placeholder-slate-400 p-4 rounded-xl border transition focus:outline-none resize-y ${
                    touched.partNeeded && errors.partNeeded
                      ? 'border-red-500 ring-1 ring-red-500 bg-red-950/20'
                      : 'border-blue-700 focus:border-red-500'
                  }`}
                />
                {touched.partNeeded && errors.partNeeded && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.partNeeded}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-blue-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-blue-200">
                  <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Submits formatted specs straight to WhatsApp for immediate quote.</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onBackToHome}
                    className="w-1/2 sm:w-auto px-5 py-3.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-[#07132c] hover:bg-blue-900 border border-blue-700 transition cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 active:bg-red-700 shadow-xl shadow-red-950/60 border border-red-400/50 transition cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Part Inquiry</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
