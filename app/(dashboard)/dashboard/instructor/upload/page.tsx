"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, List, DollarSign, Send, CheckCircle, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = ["Course Details", "Curriculum", "Pricing", "Publish"];
const SPECIALIZATIONS = ["Drilling", "Reservoir", "Production", "HSE", "LNG", "Economics", "Geoscience", "Facilities"];

export default function UploadCoursePage() {
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [published, setPublished] = useState(false);
    const [form, setForm] = useState({
        title: "", description: "", specialization: "", level: "Beginner", language: "English",
        modules: "", learningObjectives: "",
        price: "", isFree: false,
    });

    const fieldClass = "w-full bg-slate-100 dark:bg-navy-800 border border-slate-300 dark:border-navy-600 rounded-xl px-4 py-3 text-sm text-[#0D1B2A] dark:text-white placeholder:text-slate-400 dark:text-navy-500 focus:border-primary focus:outline-none transition-colors";
    const labelClass = "block text-sm font-medium text-slate-600 dark:text-navy-300 mb-1.5";
    const set = (k: string, v: string | boolean) => setForm(p => ({ ...p, [k]: v }));

    const handlePublish = async () => {
        setLoading(true);
        await new Promise(r => setTimeout(r, 1500));
        setLoading(false);
        setPublished(true);
    };

    if (published) {
        return (
            <div className="max-w-md mx-auto text-center py-20">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <div className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center mx-auto mb-5">
                        <CheckCircle className="w-10 h-10 text-green-400" />
                    </div>
                    <h2 className="font-display text-3xl text-[#0D1B2A] dark:text-white mb-3">Course Published! 🎉</h2>
                    <p className="text-slate-600 dark:text-navy-300 mb-6">Your course &ldquo;{form.title || "New Course"}&rdquo; is now live on HELM Academy.</p>
                    <div className="flex flex-col gap-3">
                        <Button onClick={() => { setPublished(false); setStep(0); setForm(f => ({ ...f, title: "" })); }}>Upload Another Course</Button>
                        <Button variant="outline" onClick={() => window.location.href = "/dashboard/instructor/courses"}>View My Courses</Button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Progress */}
            <div className="flex items-center justify-between mb-4">
                {STEPS.map((label, idx) => (
                    <React.Fragment key={label}>
                        <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${idx < step ? "bg-primary border-primary text-navy-950" : idx === step ? "border-primary text-primary bg-primary/10" : "border-slate-300 dark:border-navy-600 text-slate-400 dark:text-navy-500"}`}>
                                {idx < step ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                            </div>
                            <span className={`hidden md:block text-xs font-medium ${idx <= step ? "text-[#0D1B2A] dark:text-white" : "text-slate-400 dark:text-navy-500"}`}>{label}</span>
                        </div>
                        {idx < STEPS.length - 1 && <div className={`flex-1 mx-3 h-px transition-all ${idx < step ? "bg-primary" : "bg-navy-700"}`} />}
                    </React.Fragment>
                ))}
            </div>

            <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-2xl p-6 md:p-8">
                <AnimatePresence mode="wait">
                    {/* Step 1 */}
                    {step === 0 && (
                        <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                            <h2 className="font-display text-xl text-[#0D1B2A] dark:text-white flex items-center gap-2"><FileText className="w-5 h-5 text-primary" />Course Details</h2>
                            <div><label className={labelClass}>Title *</label><input className={fieldClass} placeholder="e.g. Advanced Directional Drilling" value={form.title} onChange={e => set("title", e.target.value)} /></div>
                            <div><label className={labelClass}>Description *</label><textarea rows={5} className={fieldClass + " resize-none"} placeholder="What will students learn?" value={form.description} onChange={e => set("description", e.target.value)} /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className={labelClass}>Specialization</label><select className={fieldClass} value={form.specialization} onChange={e => set("specialization", e.target.value)}><option value="">Select</option>{SPECIALIZATIONS.map(s => <option key={s}>{s}</option>)}</select></div>
                                <div><label className={labelClass}>Level</label><select className={fieldClass} value={form.level} onChange={e => set("level", e.target.value)}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></div>
                            </div>
                            <div><label className={labelClass}>Language</label><select className={fieldClass} value={form.language} onChange={e => set("language", e.target.value)}><option>English</option><option>Arabic</option><option>French</option></select></div>
                        </motion.div>
                    )}
                    {/* Step 2 */}
                    {step === 1 && (
                        <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                            <h2 className="font-display text-xl text-[#0D1B2A] dark:text-white flex items-center gap-2"><List className="w-5 h-5 text-primary" />Curriculum</h2>
                            <div><label className={labelClass}>Modules (one per line) *</label><textarea rows={8} className={fieldClass + " resize-none"} placeholder={"Module 1: Introduction\nModule 2: Advanced Topics\nModule 3: Case Studies"} value={form.modules} onChange={e => set("modules", e.target.value)} /></div>
                            <div><label className={labelClass}>Learning Objectives (one per line)</label><textarea rows={4} className={fieldClass + " resize-none"} placeholder={"Understand directional drilling principles\nPerform trajectory calculations"} value={form.learningObjectives} onChange={e => set("learningObjectives", e.target.value)} /></div>
                        </motion.div>
                    )}
                    {/* Step 3 */}
                    {step === 2 && (
                        <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                            <h2 className="font-display text-xl text-[#0D1B2A] dark:text-white flex items-center gap-2"><DollarSign className="w-5 h-5 text-primary" />Pricing</h2>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${form.isFree ? "bg-teal-500 border-teal-500" : "bg-slate-100 dark:bg-navy-800 border-slate-300 dark:border-navy-600"}`} onClick={() => set("isFree", !form.isFree)}>
                                    {form.isFree && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="#060E1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                                </div>
                                <span className="text-sm text-slate-600 dark:text-navy-300">This is a free course</span>
                            </label>
                            {!form.isFree && (
                                <div><label className={labelClass}>Price (USD) *</label><input type="number" className={fieldClass} placeholder="29.99" value={form.price} onChange={e => set("price", e.target.value)} /></div>
                            )}
                            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm text-slate-600 dark:text-navy-300">
                                <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-teal-400" />HELM retains 20% platform fee · 80% goes to you</p>
                            </div>
                        </motion.div>
                    )}
                    {/* Step 4 */}
                    {step === 3 && (
                        <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                            <h2 className="font-display text-xl text-[#0D1B2A] dark:text-white flex items-center gap-2"><Send className="w-5 h-5 text-primary" />Review & Publish</h2>
                            <div className="space-y-3">
                                {[["Title", form.title], ["Specialization", form.specialization], ["Level", form.level], ["Language", form.language], ["Price", form.isFree ? "Free" : `$${form.price || "—"}`]].map(([l, v]) => (
                                    <div key={l} className="flex justify-between py-2 border-b border-slate-100 dark:border-navy-800">
                                        <span className="text-sm text-slate-500 dark:text-navy-400">{l}</span>
                                        <span className="text-sm text-[#0D1B2A] dark:text-white font-medium">{v || "Not set"}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-teal-500/5 border border-teal-500/20 rounded-xl p-4 text-sm text-slate-600 dark:text-navy-300">
                                <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-teal-400" />Your course will be reviewed within 24 hours before going live.</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex justify-between mt-8 pt-6 border-t border-slate-200 dark:border-navy-700">
                    <Button variant="secondary" size="md" onClick={() => setStep(s => s - 1)} disabled={step === 0}><ArrowLeft className="w-4 h-4 mr-1" />Previous</Button>
                    {step < 3 ? (
                        <Button size="md" onClick={() => setStep(s => s + 1)}>Next <ArrowRight className="w-4 h-4 ml-1" /></Button>
                    ) : (
                        <Button size="md" onClick={handlePublish} disabled={loading} className="shadow-gold-sm font-bold">
                            {loading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Publishing…</> : "🚀 Publish Course"}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
