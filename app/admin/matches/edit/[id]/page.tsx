'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditMatchPage() {
    const router = useRouter();
    const { id } = useParams();
    const [match, setMatch] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id && id !== 'new') {
            fetch('/api/admin/matches')
                .then(res => res.json())
                .then(data => {
                    const found = data.find((f: any) => f.id === id);
                    setMatch(found);
                    setLoading(false);
                });
        } else {
            setMatch({
                id: '',
                competitionId: 'fifa-world-cup-2026',
                competitionName: 'FIFA World Cup 2026',
                team1Name: '',
                team2Name: '',
                venueName: '',
                city: '',
                country: '',
                matchDate: '',
                matchTime: '',
                round: 'Group Stage',
                slug: '',
                metaTitle: '',
                metaDescription: '',
                h1Title: '',
                affiliateLinks: [
                    { provider: 'stubhub', url: '', price: '', availability: 'available' },
                    { provider: 'viagogo', url: '', price: '', availability: 'available' }
                ]
            });
            setLoading(false);
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/admin/matches', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(match),
        });

        if (res.ok) {
            router.push('/admin/matches');
            router.refresh();
        }
    };

    const updateAffiliate = (index: number, field: string, value: string) => {
        const updatedLinks = [...match.affiliateLinks];
        updatedLinks[index] = { ...updatedLinks[index], [field]: value };
        setMatch({ ...match, affiliateLinks: updatedLinks });
    };

    const handleCommand = (command: string, value: string = '') => {
        if (command === 'removeFormat') {
            document.execCommand('removeFormat', false);
            document.execCommand('formatBlock', false, 'p');
            // Additional cleanup for lists if removeFormat misses them
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
                const container = selection.getRangeAt(0).commonAncestorContainer;
                const parentLi = (container.nodeType === 3 ? container.parentNode : container) as HTMLElement;
                if (parentLi?.closest('li')) {
                    document.execCommand('outdent', false);
                }
            }
        } else {
            document.execCommand(command, false, value);
        }
        syncContent();
    };

    const syncContent = () => {
        const editor = document.getElementById('article-editor');
        if (editor) {
            const html = editor.innerHTML;
            // Only update state if content actually changed to avoid unnecessary re-renders
            setMatch((prev: any) => {
                if (prev.articleContent === html) return prev;
                return { ...prev, articleContent: html };
            });
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <h1 className="text-2xl font-bold text-white mb-8">{id === 'new' ? 'Add New Match' : `Edit Match: ${match.team1Name} vs ${match.team2Name}`}</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Core Details */}
                <div className="glass-card p-8 space-y-6">
                    <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-4">Match Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Match ID</label>
                            <input
                                type="text"
                                value={match.id}
                                onChange={(e) => setMatch({ ...match, id: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:border-purple-500"
                                required
                                disabled={id !== 'new'}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Round</label>
                            <input
                                type="text"
                                value={match.round}
                                onChange={(e) => setMatch({ ...match, round: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:border-purple-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Team 1</label>
                            <input
                                type="text"
                                value={match.team1Name}
                                onChange={(e) => setMatch({ ...match, team1Name: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:border-purple-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Team 2</label>
                            <input
                                type="text"
                                value={match.team2Name}
                                onChange={(e) => setMatch({ ...match, team2Name: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:border-purple-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                            <input
                                type="date"
                                value={match.matchDate}
                                onChange={(e) => setMatch({ ...match, matchDate: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:border-purple-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Time</label>
                            <input
                                type="time"
                                value={match.matchTime}
                                onChange={(e) => setMatch({ ...match, matchTime: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:border-purple-500"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* SEO Content */}
                <div className="glass-card p-8 space-y-6">
                    <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-4">SEO & Content</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Meta Title</label>
                            <input
                                type="text"
                                value={match.metaTitle}
                                onChange={(e) => setMatch({ ...match, metaTitle: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:border-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">H1 Title</label>
                            <input
                                type="text"
                                value={match.h1Title}
                                onChange={(e) => setMatch({ ...match, h1Title: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:border-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Slug</label>
                            <input
                                type="text"
                                value={match.slug}
                                onChange={(e) => setMatch({ ...match, slug: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:border-purple-500"
                            />
                        </div>
                    </div>
                </div>

                {/* WYSIWYG Article Editor */}
                <div className="glass-card p-0 overflow-hidden">
                    <div className="p-4 border-b border-white/10 bg-white/5 flex flex-wrap gap-1">
                        <ToolbarButton icon="B" title="Bold" onClick={() => handleCommand('bold')} />
                        <ToolbarButton icon="I" title="Italic" onClick={() => handleCommand('italic')} />
                        <ToolbarButton icon="U" title="Underline" onClick={() => handleCommand('underline')} />
                        <div className="w-px h-6 bg-white/10 mx-1" />
                        <ToolbarButton icon="H1" title="Heading 1" onClick={() => handleCommand('formatBlock', 'H1')} />
                        <ToolbarButton icon="H2" title="Heading 2" onClick={() => handleCommand('formatBlock', 'H2')} />
                        <ToolbarButton icon="H3" title="Heading 3" onClick={() => handleCommand('formatBlock', 'H3')} />
                        <div className="w-px h-6 bg-white/10 mx-1" />
                        <ToolbarButton icon="• List" title="Bulleted List" onClick={() => handleCommand('insertUnorderedList')} />
                        <ToolbarButton icon="1. List" title="Numbered List" onClick={() => handleCommand('insertOrderedList')} />
                        <div className="w-px h-6 bg-white/10 mx-1" />
                        <ToolbarButton icon="←" title="Align Left" onClick={() => handleCommand('justifyLeft')} />
                        <ToolbarButton icon="↔" title="Align Center" onClick={() => handleCommand('justifyCenter')} />
                        <ToolbarButton icon="→" title="Align Right" onClick={() => handleCommand('justifyRight')} />
                        <div className="w-px h-6 bg-white/10 mx-1" />
                        <ToolbarButton icon="↶" title="Undo" onClick={() => handleCommand('undo')} />
                        <ToolbarButton icon="↷" title="Redo" onClick={() => handleCommand('redo')} />
                        <ToolbarButton icon="⌧" title="Clear Formatting" onClick={() => handleCommand('removeFormat')} />
                    </div>
                    <div
                        id="article-editor"
                        contentEditable
                        onInput={syncContent}
                        dangerouslySetInnerHTML={{ __html: match.articleContent || '' }}
                        className="w-full h-[500px] p-8 text-white focus:outline-none overflow-y-auto prose prose-invert prose-lg max-w-none prose-p:my-2 prose-headings:mb-4 prose-headings:mt-6 prose-ul:list-disc prose-ol:list-decimal"
                    />
                    <div className="p-3 bg-purple-500/5 text-[10px] text-gray-500 uppercase tracking-widest border-t border-white/10 text-center">
                        Visual Article Editor Active • No HTML Skills Required
                    </div>
                </div>

                {/* Affiliate Links */}
                <div className="glass-card p-8 space-y-6">
                    <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-4">Affiliate Links</h2>
                    <div className="space-y-6">
                        {match.affiliateLinks.map((link: any, index: number) => (
                            <div key={link.provider} className="p-4 rounded-xl bg-white/5 border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-3 font-semibold text-purple-400 capitalize">{link.provider}</div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Link URL</label>
                                    <input
                                        type="text"
                                        value={link.url}
                                        onChange={(e) => updateAffiliate(index, 'url', e.target.value)}
                                        className="w-full px-3 py-1.5 rounded bg-[#0f0f23] border border-white/10 text-white text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Price Label</label>
                                    <input
                                        type="text"
                                        value={link.price}
                                        onChange={(e) => updateAffiliate(index, 'price', e.target.value)}
                                        className="w-full px-3 py-1.5 rounded bg-[#0f0f23] border border-white/10 text-white text-sm"
                                        placeholder="From $225"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Availability</label>
                                    <select
                                        value={link.availability}
                                        onChange={(e) => updateAffiliate(index, 'availability', e.target.value)}
                                        className="w-full px-3 py-1.5 rounded bg-[#0f0f23] border border-white/10 text-white text-sm"
                                    >
                                        <option value="available">Available</option>
                                        <option value="limited">Limited</option>
                                        <option value="sold_out">Sold Out</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-2 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn-primary px-8 py-2"
                    >
                        Save Match
                    </button>
                </div>
            </form>
        </div>
    );
}

function ToolbarButton({ icon, title, onClick }: { icon: string, title: string, onClick: () => void }) {
    return (
        <button
            type="button"
            onMouseDown={(e) => {
                e.preventDefault();
                onClick();
            }}
            title={title}
            className="w-10 h-10 flex items-center justify-center rounded hover:bg-white/10 text-gray-400 hover:text-white transition-all text-sm font-medium"
        >
            {icon === 'B' ? <strong>B</strong> :
                icon === 'I' ? <em>I</em> :
                    icon === 'U' ? <span className="underline decoration-2">U</span> : icon}
        </button>
    );
}
